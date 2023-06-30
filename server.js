import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import hotelRoute from "./routes/hotel.route.js";
import roomRoute from "./routes/room.route.js";
import bookingRoute from "./routes/booking.route.js";
import orderRoute from "./routes/order.route.js";
import adminRoute from "./routes/admin.route.js";
import conversationRoute from "./routes/conversation.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = process.env.PORT || 8800;

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

// app.use(cors({
//   origin: ['https://hey-iker.vercel.app','http://localhost:3001', 'http://localhost:3000','https://travel-jpx4.onrender.com'],
//   credentials: true
// }));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("api/admin", adminRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log("Backend server is running!");
});
