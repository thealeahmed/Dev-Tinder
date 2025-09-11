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



  