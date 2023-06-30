import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    require:true
  },
  lastName:{
    type:String,
    required:true
  },
  username: {
    type: String,
    unique: true,
    sparse: true
  },

  email: {
    type: String,
    unique: true,
    sparse: true
  },

  phone:{
    type:String,
  },
    role: {
      type: String,
      enum: ["isAdmin", "isAgent", "isClient"],
      required:true,
     },
 
     isAdmin:{
      type:Boolean,
      default:false
     },
     isAgent:{
      type:Boolean,
      default:false,
     },

     isClient:{
      type:Boolean,
      default:false,
     },


  password: String,
  socialMedia: {
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    facebook: {
      id: String,
      token: String,
      email: String,
      name: String
    },
    github: {
      id: String,
      token: String,
      email: String,
      name: String
    }
  },
  authMethod: {
    type: String,
    enum: ['traditional', 'google', 'facebook', 'github'],
    default: 'traditional'
  },

}, { timestamps: true });


export default mongoose.model("User", userSchema);
