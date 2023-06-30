import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";


// import Booking from "../models/Booking";
import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import Order from "../models/order.model.js";


// Create a booking
export const createBooking = async (req, res, next) => {
  const { roomId, clientId, startDate, endDate, totalAmount, guest } = req.body;

  try {
    if (req.userId !== clientId) return next(createError(404, " anAuthorized access"));

    // check if room has capacity of the guest 
    const room = await Room.findById(roomId);
    if (!room) return next(createError(404, "Invalid room"));

    if (room.capacity < guest) return next(createError(404, "Too much Guest"));
    // Check if the room is available for the given date range
    const isRoomAvailable = await Booking.isRoomAvailable(roomId, startDate, endDate);
    if (!isRoomAvailable) {
      return res.status(400).json({ error: "Room is not available for the selected dates" });
    }


    // // Create the booking
    // const booking = new Booking({
    //   roomId,
    //   clientId,
    //   startDate,
    //   endDate,
    //   totalAmount
    // });

    // // Save the booking
    // await booking.save();

    // res.json(booking);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all for admin
export const getAllBookings = async (req, res, next) => {
  try {
    // check if user role is admin 
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(404, "unauthorized Access"));
    }

    if (user.role !== 'isAdmin') {
      return next(createError(404, "Access Denied"));
    }

    const bookings = await Booking.find();
    res.status(200).json(bookings)
  } catch (error) {
    next(createError(404, "samething goes wrong"));
  }
}

// get all my bookings 
export const getMyBookings = async (req, res, next) => {

  try {
    // check if user is authenticated 
    if (req.userId !== req.params.id) return next(createError(404, "access Denied"));
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(401, "Access Denied"));
    }
    const book = await Booking.find({ clientId: req.userId });
    if (!book) return next(createError(404, "booking not founds"));

    res.status(200).json(book);
  } catch (error) {
    next(createError(500, "Samething Went Wrong"));
  }

}

// get single booking 

export const getSingleBooking = async (req, res, next) => {

  try {
    const booking = await Booking.findOne({ _id: req.params.id });
    if (!booking) return next(createError(404, "Room NotFound "));
    res.status(200).json(booking);
  } catch (error) {
    next(createError(404, "Samething goes wrong on the server"));
  }
}



//  validate the starting date and enddate which is greater than or lesser that with others 



