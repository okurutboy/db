import express from "express";
 
import { verifyToken } from "../middleware/jwt.js";
import { createRoomListing, deleteRoom, getAllRooms, getMyRooms, getSingleRoom, updateRoom } from "../controllers/room.controller.js";

const router = express.Router();

router.post("/",verifyToken,createRoomListing);
router.get("/",getAllRooms);
router.get('/single/:id',getSingleRoom);
router.get('/myrooms/:id',verifyToken,getMyRooms);
router.patch('/edit/:id',verifyToken,updateRoom);
router.delete('/:id',verifyToken,deleteRoom);



export default router;