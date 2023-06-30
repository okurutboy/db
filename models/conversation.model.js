import mongoose from "mongoose";

const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {

    convId:{
      type: String,
      required:true,
      unique:true,
    },
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    readByAgent: {
      type: Boolean,
      default: false,
    },
    readByClient: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
