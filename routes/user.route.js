import express from "express";
import { deleteUser, getAllUser, getUser,updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", verifyToken, getUser);
router.put('/:userId', verifyToken, updateUser);
router.get('/',getAllUser);

export default router;