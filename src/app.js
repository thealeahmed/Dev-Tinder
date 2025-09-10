 const express=require("express")

 const app=express(); 
  app.get("/user",(req,res)=>{
   res.send({
      firstName:"Ali",
      lastName:"Ahmad"
   })
  })
  app.post("/user",(req,res)=>{

   //DATA IS SAVED TO DB
   res.send("Data successfully saved to the database")
  })

  app.delete("/user",(req,res)=>{
   res.send("Data is deleted successfully")
  })
  app.patch("/user",(req,res)=>{
   res.send("User is updated successfully")
  })
  app.put("/user",(req,res)=>{
   res.send("Data is updated now Check..!!")
  })
app.listen(3000,()=>{
   console.log('server is successfully listening on 3000...')
})
  