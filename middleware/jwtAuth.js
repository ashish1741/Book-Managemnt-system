require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {

    const authorization =  req.headers.authorization;

    if (!authorization) {
        res.status(401).json({error:`Token Not Found`})
        
    }





  //extract the JWT token from the request header
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      error: "unauthorized",
    });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    //attach user information to the request user

    req.userData = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      error: "Invalid Token",
    });
  }
};

// generate jwt token 

const generateJwtToken = (userData) => {

    return jwt.sign(userData ,  process.env.SECRET_KEY , {expiresIn:30000})

}



module.exports = {jwtAuthMiddleware , generateJwtToken}
