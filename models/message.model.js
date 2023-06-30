import mongoose from "mongoose";

const { Schema } = mongoose;

const MessageSchema = new Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
},{
  timestamps: true
});

export default mongoose.model("Message", MessageSchema);
