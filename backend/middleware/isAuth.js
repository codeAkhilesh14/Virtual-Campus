// ye middleware cookie ke andar jo token h usko find karega , aur usme se user id nikalega
// isse ye hoga agar user login tha aur logout nhi kiya h to user login hi rahe

// middleware ke andar 3 cheeze hoti hai req, res, next(if everything is going good to usko aage badha denge)

// request -> middleware(if it allow then so go to server) -> server

import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    // try from cookie
    let { token } = req.cookies
    console.log("Token from cookies:", token);

    if (!token) {
      console.log("🔴 No token found. Blocking request.");
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🟢 Token verified successfully:", verifyToken);

    if(!verifyToken) {
      console.log("🔴 Token verification failed.");
      return res.status(401).json({ message: "Unauthorized: Token verification failed" });
    }

    req.userId = verifyToken.userId;
    
    console.log("🟢 User ID extracted:", req.userId);

    next();
    console.log("🟢 Passed isAuth, moving to next middleware.");
  } catch (error) {
    console.log("🔴 isAuth error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isAuth;

// ab hum controllers me user.controllers.js banayenge jo humme current user ka details dega

// ye middleware cookie ke andar jo token h usko find karega , aur usme se user id nikalega
// isse ye hoga agar user login tha aur logout nhi kiya h to user login hi rahe

// middleware ke andar 3 cheeze hoti hai req, res, next(if everything is going good to usko aage badha denge)

// request -> middleware(if it allow then so go to server) -> server