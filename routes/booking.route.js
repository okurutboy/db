import express from "express";
 
import { verifyToken } from "../middleware/jwt.js";
// import { createHotelListing, deleteHotel, getListingsHotels, getMyHotels, getSingleHotel, updateHotel } from "../controllers/hotel.controller.js";
import { createBooking, getAllBookings, getMyBookings } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/",verifyToken,createBooking);
router.get('/',verifyToken,getAllBookings); //for admin
// router.get('/single/:id',getSingleHotel);
router.get('/my/:id',verifyToken,getMyBookings);
// router.patch('/edit/:id',verifyToken,updateHotel);
// router.delete('/:id',verifyToken,deleteHotel);
 

export default router;