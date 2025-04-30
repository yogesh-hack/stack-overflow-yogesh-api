import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookie from "cookie"; 

dotenv.config();

const auth = (req, res, next) => {
  const apiKey = req.query.apikey || req.headers["x-api-key"];
  
  if (!apiKey && !req.headers.authorization) {
    return res.status(401).json({ message: 'API key missing' });
  }
  if (apiKey === process.env.MASTER_API_KEY) {
    return next(); 
  }

  const cookies = cookie.parse(req.headers.cookie || ''); 
  const userApiKey = cookies.userApiKey; 

  if (apiKey === userApiKey) {
    return next();
  }
  if (apiKey !== userApiKey) {
    return res.status(403).json({ message: 'Invalid API key' });
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedData?.id;

    next();
  } catch (error) {
    console.error("JWT Verification error:", error);
    return res.status(403).json({ message: 'Expired API key' });
  }
};

export default auth;
