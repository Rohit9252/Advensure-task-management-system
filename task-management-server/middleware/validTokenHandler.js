const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const { ACCESS_TOKEN_SECRET } = process.env;

const valiadateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    let user;
    try {
      user = jwt.verify(token, ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.status(401).json({ status: false, msg: "Invalid token" });
    }


    try{
        user = await User.findById(user.id);
        if (!user) {
          return res.status(401).json({ status: false, msg: "User not found" });
        }
    
        req.user = user;
        next();

    }
    catch(err){
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }



    if (!token) {
      res.status(401);
      throw new Error("Unauthorized");
    }
  }
});

module.exports = valiadateToken;
