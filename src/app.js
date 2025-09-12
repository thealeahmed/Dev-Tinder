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



  