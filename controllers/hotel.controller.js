import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import { sendEmail } from "../utils/email.js";


// create hotels 
export const createHotelListing = async (req, res, next) => {

    const { name, description, country, state, city, zipcode,images } = req.body;
    // console.log("check role ",req.isAgent);
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


        const savedHotel = new Hotel({
            name,
            description,
            agentId: req.userId,
            images,
            location: {
                country: country,
                state: state,
                city: city,
                zipcode: zipcode
            }
        });


        await savedHotel.save();

          // Send email to the user
  //   const userEmail = 'ikerpaster@gmail.com.com'; 
  //   const subject = 'Hotel Listing Confirmation';
  //   const message = `congulaturations`;
  //  const send =  await sendEmail(userEmail, subject, message);

// if(!send) return next(createError(404,"error in sending email to the clients"));

        res.status(201).json({ message: savedHotel });
    } catch (error) {
        next(createError(404, "samething goes wrong!!!"));
        console.log(error);
    }




}

// get all hotels
export const getListingsHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels)
    } catch (error) {
        next(createError(404, "samething goes wrong"));
    }
}


// get single hotel
export const getSingleHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel.findById(req.params.id);
        res.status(200).json(hotels)
    } catch (error) {
        next(createError(404, "samething goes wrong"));
    }
}

// get my hotels 
export const getMyHotels = async (req, res, next) => {
    try {
        // check if user is authenaticated 
        const user = await User.findById(req.userId);
        if (!user) {
            return next(createError(404, "unauthorized Access"));
        }

        if (user.role !== 'isAgent') {
            return next(createError(404, "anAUthorized Access"));
        }
        if(req.userId !== req.params.id) return next(createError(404," UnAuthorized Access"));

        const hotels = await Hotel.find({ agentId: req.params.id });
        if (!hotels) return next(createError(404,"hotels notFound"));
        res.status(200).json(hotels)
    } catch (error) {
        next(createError(404, "samething goes wrong"));
    }
}

 

// Update a hotel
export const updateHotel = async (req, res) => {
//   const { hotelId } = req.params;
  const { name, description, location, agentId } = req.body;

  try {

     // check if user is authenaticated 
     const user = await User.findById(req.userId);
     if (!user) {
         return next(createError(404, "unauthorized Access"));
     }

     if (user.role !== 'isAgent') {
         return next(createError(404, "anAUthorized Access"));
     }

     
    const hotel = await Hotel.findByIdAndUpdate(
        { _id: req.params.id, agentId: req.userId },
      {
        name,
        description,
        location,
        agentId,
      },
      { new: true }
    );

    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }

    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

 





  
// delete 
export const deleteHotel = async (req, res, next) => {
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
        const isExist = await Hotel.findOne({_id: req.params.id, agentId: req.userId });
        if (!isExist) return next(createError(404, "UnAutorized Access"));

        await Hotel.findByIdAndDelete({ _id: req.params.id, agentId: req.userId });
        res.status(200).send("deleted.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error.");
    }
};




