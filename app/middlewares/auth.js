import jwt from "jsonwebtoken";
import { jwt as configJwt } from "./../config/jwt";

const authenticated = (req, res, next) => {
    //get the token from the header if present
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    //if no token found, return response (without going to the next middelware)
    if (!token) 
        return res.status(401).json({
            response: false,
            message: "Access denied. No token provided.",
            data: req.body
        });

    try {
        //if can verify the token, set req.user and pass to next middleware
        const decoded = jwt.verify(token, configJwt.secretKey);
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        return res.status(401).json({
            response: false,
            message: "Invalid token.",
            data: req.body
        });
    }
}

export { authenticated }