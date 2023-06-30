 
import express from "express";
 
import { verifyToken } from "../middleware/jwt.js";
import { getAllUser } from "../controllers/admin.controller.js";

const router = express.Router();

// get all users 
router.post("/",verifyToken,getAllUser);
// edit user by id 
// delete user by id

// get all hotels 
// get hotels by id 
// edit hotels 
// get hotels by specifiq users 
// delete hotel 


// get all rooms 
// get rooms by id 
// get room by specifiq users 
// edit room 
// delete room 

// get all bookings 
// get all acupied active bookings means the acupied rooms 
// edit bookings 
// delete bookings 

 

// router.get('/my/:id',getConversations);
// router.get('/single/:id',getSingleHotel);
// router.get('/myhotels/:id',verifyToken,getMyHotels);
// router.patch('/edit/:id',verifyToken,updateHotel);
// router.delete('/:id',verifyToken,deleteHotel);
 

export default router;