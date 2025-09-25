import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({

    username:{
        type : String,
        required : true,
        trim:true,
    },

    email: {
        type : String,
        required : true,
        unique : true,
        lowercase: true, 
        trim : true,
        match : [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
    },

    password: {
        type : String,
        required : true,
        trim : true,
        min : 6,
        max : 12,   
    },

    profilePicture:{
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    },

    followers:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    following:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})


userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);   
    }
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User", userSchema);