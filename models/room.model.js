import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    agentId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    capacity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    amenities: {
      type: [String],
      trim: true
    },
    images: {
      type: [String],
      trim: true
    },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("Room", roomSchema);
