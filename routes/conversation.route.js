 
import express from "express";
 
import { verifyToken } from "../middleware/jwt.js";
import { createHotelListing, deleteHotel, getListingsHotels, getMyHotels, getSingleHotel, updateHotel } from "../controllers/hotel.controller.js";
import { createConversation, getConversations } from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/",verifyToken,createConversation);
router.get('/my/:id',getConversations);
// router.get('/single/:id',getSingleHotel);
// router.get('/myhotels/:id',verifyToken,getMyHotels);
// router.patch('/edit/:id',verifyToken,updateHotel);
// router.delete('/:id',verifyToken,deleteHotel);
 

export default router;