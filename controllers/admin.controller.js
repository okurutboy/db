import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";



// get all users 
export const getAllUser = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId);
        if (!user) {
            return next(createError(404, "Invalid authentication"));
        }

        if (user.role !== 'isAdmin') {
            return next(createError(404, "anAUthorized Access"));
        }

        const allUser = await User.find();
        if (!allUser) return next(createError(404, "Error to get all users"));

        res.status(200).json(allUser);
    } catch (error) {
        next(createError(500, "samething goes wrong on the server"));
    }

}





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