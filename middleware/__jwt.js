import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import User from "../models/user.model.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  // console.log("this is my token ",token);

  if (!token) return next(createError(401,"You are not authenticated!"))


  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403,"Token is not valid!"))
    req.userId = payload.id;
    next()
  });
};

export const verifyAgent = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.isAgent) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
}

export const verifyClient = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isClient) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
}


export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
}

 
