const jwt = require('jsonwebtoken');

module.exports.checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token)
  if(!token){
    return res.status(401).json('No token found');
  }
  jwt.verify(token,"AUTHENTICATION", (err, payload) => {
    console.log(payload)
    if(err){
      return res.status(403).json({message:'Invalid Token'});
    }
    req.user = {
      id: payload.id
    } 
    next();
  })
}