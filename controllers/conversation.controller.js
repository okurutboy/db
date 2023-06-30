import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import createError from "../utils/createError.js";

// Create a new conversation
export const createConversation = async (req, res, next) => {
  const { agentId, clientId } = req.body;
  try {
    // check if user is authenticated 
    // if(req.userId !== agentId && req.userId!== clientId) return next(createError(404,"UnAuthirized Access"));
const convId = clientId+agentId;
// check if convId is exist 
const isConvIdExist = Conversation.findOne({convId:convId});
if(isConvIdExist) return next(createError(404,"conversation already exist"));
    const conversation = new Conversation({
      convId: convId,
      agentId: agentId,
      clientId: clientId,
      readByAgent: false,
      readByClient: false,
      lastMessage: null,
    });
    
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

// Get all conversations for a specific user
export const getConversations = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const conversations = await Conversation.find({
      $or: [{ agentId: id }, { clientId: id }],
    }).populate("agentId clientId lastMessage");
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

// Get a specific conversation by its ID
export const getConversationById = async (req, res, next) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId).populate(
      "agent client lastMessage"
    );
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    next(error);
  }
};

// Create a new message in a conversation
export const createMessage = async (req, res, next) => {
  const { conversationId } = req.params;
  const { userId, desc } = req.body;
  try {
    const message = new Message({
      conversationId: conversationId,
      userId: userId,
      desc: desc,
    });
    await message.save();

    await Conversation.findByIdAndUpdate(conversationId, {
      $set: { lastMessage: message._id },
    });

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

// Get all messages in a conversation
export const getMessages = async (req, res, next) => {
  const { conversationId } = req.params;
  try {
    const messages = await Message.find({ conversationId: conversationId }).populate("userId");
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
