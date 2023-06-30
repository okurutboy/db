import express from "express";
 
import { verifyToken } from "../middleware/jwt.js";
import { createHotelListing, deleteHotel, getListingsHotels, getMyHotels, getSingleHotel, updateHotel } from "../controllers/hotel.controller.js";
import { checkUserRole } from "../middleware/roles.js";
 

const router = express.Router();

router.post("/",verifyToken,createHotelListing);
router.get('/',getListingsHotels);
router.get('/single/:id',verifyToken,getSingleHotel);
router.get('/myhotels/:id',verifyToken,getMyHotels);
router.patch('/edit/:id',verifyToken,updateHotel);
router.delete('/:id',verifyToken,deleteHotel);
 

export default router;