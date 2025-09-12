const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String,
        required:true,
        minLength:3,
        maxLength:24,
     },
    lastName: { type: String ,
         maxLength:24
    },
    emailId: { type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
         maxLength:24
     },
    password: { type: String,
        required:true,
         maxLength:24
     },
    age: { type: Number,
      min:18
     },
    gender: { type: String ,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
        
    },
    
        photoUrl:{
            type:String,
            default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTabOgeMNrSqYJ4c2-kMg0I_QreIqbVVfgvWQ&s"
        },
        about:{
            type:String,
            default:"This is the default about of the user!"
        },
        skills:{
            type:[String]
        },
    },{ 
    timestamps:true
});
  
const User = mongoose.model("User", userSchema);

module.exports = User;
