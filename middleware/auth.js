const jwt = require('jsonwebtoken');
const SECRET_KEY = "THISISMYSECRETKEYFORJWTAUTHENTICATIONFORNODEPROJECT";

const auth =  (req, res, next) => {
  try {
   let token = req.headers.authorization;
   
    if(token){
        token = token.split(" ")[1];
        
        jwt.verify(token, SECRET_KEY);
       
    }
    else{
        res.status(401).json({ message: 'Unauthorized User' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized User Error' });
  }
};
module.exports = auth;