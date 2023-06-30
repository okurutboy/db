import mongoose from "mongoose";

const { Schema } = mongoose;

const HotelSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  images: {
    type: [String],
    trim: true
  },
  location: {
    country: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true
    },
    city: {
      type: String,
      require: true
    },
    zipcode:{
      type:String,
      require:true
    }
  },
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  }



}, { timestamps: true });


export default mongoose.model("Hotel", HotelSchema);
