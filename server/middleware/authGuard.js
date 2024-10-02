const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const secretKey = process.env.JWT_SECRET; 

// JWT Auth Middleware (Auth Guard)
function authGuard(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({error:true, message: 'Access denied. No token provided.' });
  }

  const formattedToken = token.split(' ')[1];

  try {
    const decoded = jwt.verify(formattedToken, secretKey);
console.log(decoded)
    if(typeof decoded !== "undefined"){
        next() 
        return true
    }else{
        return false
    }
    // req.user = decoded; // Store user info in request object
    // next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token or token expired.' });
  }
}

module.exports = {authGuard}
// Example route: Protected route (auth required)

