import Order from "../models/order.model.js";
import Stripe from "stripe";
import Room from "../models/room.model.js";
import createError from "../utils/createError.js";
import Booking from "../models/booking.model.js";


export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const room = await Room.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: room.price * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    roomId: room._id,
    price: room.price,
    clientId: req.userId,
    isCompleted: false,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const createOrder = async (req, res, next) => {

  try {
    // check if room is exist 
    const room = await Room.findById(req.params.id);
    if (!room) return next(createError(404, "Room NotFound"));

    const newOrder = new Order({
      roomId: room._id,
      price: room.price,
      clientId: req.userId,
      isCompleted: false,
      payment_intent: paymentIntent.id,
    });
  } catch (error) {
    next(createError(500, "samething goes wrong on the server"));
  }


}

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      clientId: req.userId, isCompleted: true
    });
    res.status(200).send(orders);
  } catch (err) {
    next(createError(404, "error in making orders"));
  }
};
export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    // get room info then send it into booking table 
    const myLatestOrder = await Order.findOne({ payment_intent: req.body.payment_intent });
    if (!myLatestOrder) return next(createError(404, "samething happens please try to cummunicate our support team for more help"));


    // Create the booking
    const booking = new Booking({
      roomId: myLatestOrder.roomId,
      clientId: myLatestOrder.clientId,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      totalAmount: myLatestOrder.price
    });

    // Save the booking
    await booking.save();

    res.json(booking);

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};
