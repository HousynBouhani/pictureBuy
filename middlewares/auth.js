const jwt = require("jsonwebtoken");
const config = require("config");


/* check if token is sent  in the header nad valid for auth*/

const tokenChecker = (req, res, next) => {
  //Get token from header
  const token = req.header("x-auth-token");
  // check for token in the header deny auth if not found
  !token && res.status(401).json({errors: [{msg:"No token , atuthorization denied" }]});
  
  try {
    //verify if the token is valid get the token payload
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (error) {
      console.error(error.message);
      res.status(401).json({errors: [{msg:'Token is not valid' }]});
  }
};

module.exports = tokenChecker;
