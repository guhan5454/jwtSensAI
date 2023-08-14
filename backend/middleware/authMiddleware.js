import jwt from 'jsonwebtoken' 
import 'dotenv/config.js'

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1] || ''; 
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };


export default verifyToken