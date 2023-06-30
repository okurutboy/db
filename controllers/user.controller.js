import User from "../models/user.model.js";
import createError from "../utils/createError.js";


export const deleteUser = async (req, res,next) => {
  try {

    if (req.userId !== req.params.id) {
      return next(createError(403, "You can delete only your account!"));
    }
  
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res) => {
  const { userId } = req.params; // Assuming the user ID is passed as a route parameter
  const { fullName, phone, country, state,city,zipcode} = req.body; // Assuming the updated data is sent in the request body

  try {

    if(req.userId !== userId){
      return res.status(404).json({ message: "Invalid Credentials please try again later!" });
    }
    const user = await User.findById(userId);
     
    console.log("User User User:", user._id);
    console.log("userId",userId);
     
      user.fullName = fullName;
      user.phone = phone;
      user.location= {
        country : country,
        state:state,
        city:city,
        zipcode:zipcode
      };
        await user.save();

        res.status(200).json(user);
  
  } catch (error) {
    return res.status(500).json({ error: 'Error updating user' });
  }
};


// get all users 
export const getAllUser = async (req,res,next)=>{
  try {
    const user = await User.find();
    if(!user) return next(createError(404,"Error to get all users"));

    res.status(200).json(user);
  } catch (error) {
    next(createError(500,"samething goes wrong on the server"));
  }

}

 
 

