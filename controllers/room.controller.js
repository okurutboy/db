import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

// create room 
export const createRoomListing = async (req, res, next) => {
 
 
    const {hotelId, name, description, capacity, price, amenities, images } = req.body;
      
    // console.log("the role:: ", role);
    try {
        // check if user is authenaticated 
        const user = await User.findById(req.userId);
        if (!user) {
            return next(createError(404, "unauthorized Access"));
        }


        if (user.role !== 'isAgent') {
            return next(createError(404, "anAUthorized Access"));
        }

        // check the owner of the hotel is available 
        const isHotelExist = await Hotel.findOne({_id:hotelId,agentId:req.userId});
        if(!isHotelExist) return next(createError(404,"invalid Hotel"));

       const room = await Room.create({
        hotelId,
          agentId:req.userId,
          name,
          description,
          capacity,
          price,
          amenities,
          images
        });


        await room.save();

        res.status(201).json({ message: room });
    } catch (error) {
        next(createError(404, "samething goes wrong!!!"));
        console.log(error);
    }




}

// get all rooms
export const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms)
    } catch (error) {
        next(createError(404, "samething goes wrong"));
    }
}


// get single hotel
export const getSingleRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room)
    } catch (error) {
        next(createError(404, "samething goes wrong"));
    }
}

// get my room 
export const __getMyRooms = async (req, res, next) => {
    try {
        // check if user is authenaticated 
        const user = await User.findById(req.userId);
        if (!user) {
            return next(createError(404, "unauthorized Access"));
        }

        if (user.role !== 'isAgent') {
            return next(createError(404, "anAUthorized Access"));
        }

        const rooms = await Room.find({ agentId: req.params.id });
       if (!rooms) return next(createError(404,"room notFound"));
        res.status(200).json(rooms)
    } catch (error) {
        next(createError(404, "samething goes wrong"));
    }
}



export const getMyRooms = async (req, res, next) => {
  try {
    // check if user is authenticated
    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(401, "Unauthorized Access"));
    }

    if (user.role !== "isAgent") {
      return next(createError(403, "Unauthorized Access"));
    }

    if(req.userId !== req.params.id) return next(createError(404," UnAuthorized Access"));
    
    const rooms = await Room.find({ agentId: req.params.id });
    if (rooms.length === 0) {
      return next(createError(404, "Rooms not found"));
    }

    res.status(200).json(rooms);
  } catch (error) {
    next(createError(500, "Something went wrong"));
    console.log(error);
  }
};



 
// delete 
export const deleteRoom = async (req, res, next) => {
    try {

        // check if user is authenaticated 
        const user = await User.findById(req.userId);
        if (!user) {
            return next(createError(404, "unauthorized Access"));
        }

        if (user.role !== 'isAgent') {
            return next(createError(404, "anAUthorized Access"));
        }

        //  check if hotel is exist 
        const isExist = await Room.findOne({_id: req.params.id, agentId: req.userId });
        if (!isExist) return next(createError(404, "Room Not FOund Access"));

        await Room.findByIdAndDelete({ _id: req.params.id, agentId: req.userId });
        res.status(200).send("deleted.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error.");
    }
};


// update room 
export const updateRoom = async (req, res,next) => {
    const { id } = req.params;
    try {
      const { name, description, capacity, price, amenities, images } = req.body;

       // check if user is authenaticated 
       const user = await User.findById(req.userId);
       if (!user) {
           return next(createError(404, "unauthorized Access"));
       }

       if (user.role !== 'isAgent') {
           return next(createError(404, "anAUthorized Access"));
       }

      const room = await Room.findOneAndUpdate(
        {_id: id, agentId: req.userId},
        {
          name,
          description,
          capacity,
          price,
          amenities,
          images
        },
        { new: true }
      );
      if (!room) {
        return next(createError(404, "Room Not Found"));
      }
      res.status(200).json(room);
    } catch (error) {
      next(createError(500,"samething goes wrong!"));
    }
  };
 
 
  


 
  