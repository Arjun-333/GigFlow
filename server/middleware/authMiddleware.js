import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  console.log('Cookies received:', req.cookies); // Debug log
  token = req.cookies.jwt;
  
  // Check for Bearer token in headers (Mobile/Cross-Site support)
  if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
     token = req.headers.authorization.split(' ')[1];
     console.log('Token found in headers');
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };
