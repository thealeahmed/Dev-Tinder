 const express=require("express")

 const app=express(); 

const User=require("./models/user")
const connectDB=require("./config/database")
app.use(express.json()) 

app.post('/signup',async(req,res)=>{
       //creating a new instance of the user model 
  const user=new User(req.body);
 await user.save();
res.send("User added successfully")
})

app.get("/user",async(req,res)=>{
   const email=req.body.emailId;
   //I will call the find method on user model
try{
   //GET USER BY EMAIL
  const users= await  User.find({
      emailId:email,
   })
   if(users.length===0){
      res.status(404).send("user not found")
   }else{
  res.send(users)
   }
}
catch (err){
   res.status(400).send("Something went wrong ")
   
}
})

//FEED API-GET /feed -get all the users from the db

app.get("/feed",async (req,res)=>{
try{
   const users=await User.find({

   })
res.send(users)
}
catch (err){
   res.status(400).send("Something went wrong ")
   
}
})
app.get("/id", async (req, res) => {{
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
}})


app.delete('/user', async(req,res)=>{
const userid = req.body._id;
try{
   const user=await User.findByIdAndDelete(userid)
   res.send("user deleted successfully")
}
catch (err) {
    console.error(err);
    res.status(400).send("Something went wrong");
  }
})

//Update data of the user

app.patch("/user", async(req,res)=>{
   const userid=req.body._id;
   const data=req.body;
   try{
      await User.findByIdAndUpdate(userid ,data)
      res.send("user updated successfully")
   }
   catch (err) {
      console.error(err);
    res.status(400).send("Something went wrong");
  }
}) 
connectDB()
.then(()=>{
   console.log("Database is connected successfully")
app.listen(3000,()=>{
   console.log('server is successfully listening on 3000...')
})
})
.catch((err)=>{
   console.error("Database cannot be connected!!")

})



  