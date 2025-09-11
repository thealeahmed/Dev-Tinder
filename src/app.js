 const express=require("express")

 const app=express(); 
//   app.get("/user",(req,res)=>{
//    res.send({
//       firstName:"Ali",
//       lastName:"Ahmad"
//    })
//   })
//   app.post("/user",(req,res)=>{

//    //DATA IS SAVED TO DB
//    res.send("Data successfully saved to the database")
//   })

//   app.delete("/user",(req,res)=>{
//    res.send("Data is deleted successfully")
//   })
//   app.patch("/user",(req,res)=>{
//    res.send("User is updated successfully")
//   })
//   app.put("/user",(req,res)=>{
//    res.send("Data is updated now Check..!!")
//   })

// app.use("/user",
//    (req,res,next)=>{
//    //Route Handler
//    // res.send("Route Handler 1")
//    next();
// });
// app.use("/user",
//    (req,res,next)=>{
//    //Route Handler
//    res.send("Route Handler 2")
//    next();
// });  

//HANDLE AUTH MIDDLEWARES FOR ALL GET POST---- REQUESTS
//this is the middleware
app.use("/admin",(req,res,next)=>{
   console.log('admin auth is getting checked')
   const token="xyz";
   const isAdminAuthorized=token==="xyz";
   if(!isAdminAuthorized){
      res.status(401).send("unauthorized access")

   }
   else{
      next();
   }
}


)
app.get("/admin/getAllData",(req,res)=>{
   res.send("All data is sent")
})
app.get("/admin/deleteuser",(req,res)=>{
   res.send("user is deleted")
})
app.listen(3000,()=>{
   console.log('server is successfully listening on 3000...')
})
  