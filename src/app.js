const express = require("express");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator=require("validator")

const app = express();

const User = require("./models/user");
const connectDB = require("./config/database");
app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    //1. validation of data the standard is we will
    //make some helper/utility functions
    validateSignUpData(req);

    //2.Encrypt the password
    const{password,firstName,lastName,emailId}=req.body;
      const passwordHash=await bcrypt.hash(password,10)
      console.log(passwordHash)


    //3. storing in data

    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash,
    }
    );
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR :" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  //I will call the find method on user model
  try {
    //GET USER BY EMAIL
    const users = await User.find({
      emailId: email,
    });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

//FEED API-GET /feed -get all the users from the db

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});
app.get("/id", async (req, res) => {
  {
    const userid = req.body._id; // ⚠️ Usually GET doesn't have a body, but I'll keep it since you want

    try {
      console.log(userid);

      const users = await User.findById(userid);

      if (!users) {
        return res.status(404).send("user not found");
      } else {
        console.log(users);
        res.send(users);
        console.log(users);
      }
    } catch (err) {
      console.error(err);
      res.status(400).send("Something went wrong");
    }
  }
});

app.delete("/user", async (req, res) => {
  const userid = req.body._id;
  try {
    const user = await User.findByIdAndDelete(userid);
    res.send("user deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Something went wrong");
  }
});

//Update data of the user

app.patch("/user/:userId", async (req, res) => {
  const userid = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed ");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skill cannot be more than 10 ");
    }
    await User.findByIdAndUpdate(
      userid,
      data <
        {
          runValidators: true,
        }
    );
    res.send("user updated successfully");
  } catch (err) {
    console.error(err);
    res.status(400).send("Update Failed" + err.message);
  }
});

//login api
app.post("/login",async(req,res)=>{
   try{
      const{emailId,password}=req.body;

      const user=await User.findOne({
         emailId:emailId
      })
      if(!user){
         throw new Error("Email ID is not valid")
      }
      const isPasswordValid=await bcrypt.compare(password,user.password)
      if(isPasswordValid){
         res.send("Login Successful")
      }else{
         throw new Error("inCorrect Password")
      }
   }
   catch (err){
      res.status(400).send("ERROR: " +err.message)

   }
})

connectDB()
  .then(() => {
    console.log("Database is connected successfully");
    app.listen(3000, () => {
      console.log("server is successfully listening on 3000...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
