// import userModel from "../models/user.model.js";
// import { verifyToken } from "./jwt.js";

 

// export const checkUserRole = (roles) => async (req, res, next) => {
 
//     try {
//       const user = await userModel.findById(req.userId).select("isAgent isClient isAdmin");
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
  
//       const hasRole = roles.some(role => user[role]);
  
//       if (!hasRole) {
//         return res.status(401).json({ message: "Unauthorized" });
//       }
  
//       req.isAgent = user.isAgent;
//       req.isClient = user.isClient;
//       req.isAdmin = user.isAdmin;

//       console.log("agent::",req.isAgent);
//       next();
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };




  import userModel from "../models/user.model.js";
import { verifyToken } from "./jwt.js";

export const checkUserRole = (roles) => async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId).select("isAgent isClient isAdmin");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hasRole = roles.some(role => user[role]);

    if (!hasRole) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.isAgent = user.isAgent;
    req.isClient = user.isClient;
    req.isAdmin = user.isAdmin;

    console.log("agent::", req.isAgent);
    console.log("rerere ::", req.userId);
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 