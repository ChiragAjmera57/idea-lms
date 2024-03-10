const jwt = require('jsonwebtoken');
const { User } = require('../modal/user.modal');

const secretKey = 'CHIRAG57'; 
async function authenticateAdmin(req, res, next)  {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const user = await User.findById(decoded.userId)
    if(user.isAdmin){
        req.user = {
          user, 
          };
        next()
    }
    else{
        res.status(401).json({messge:'Not authorize'})
    }

  } catch (error) {
    res.status(401).json({ message: 'Invalid token. Access denied.' });
  }
}

module.exports = authenticateAdmin;