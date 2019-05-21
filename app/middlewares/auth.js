import jwt from "jsonwebtoken";
import { jwt as configJwt } from "./../config/jwt";
import Jwt from "./../helpers/jwt.helper";

const authenticated = async (req, res, next) => {
    try {
        //get the token from the header if present
        let token = req.headers["x-access-token"] || req.headers["authorization"] || req.cookies['x-access-token'];
        //if no token found, return response (without going to the next middelware)
        if (!token) 
            return res.status(401).json({
                response: false,
                message: "Access denied. No token provided.",
                data: req.body
            });
        //if can verify the token, set req.user and pass to next middleware
        token = token.replace('Bearer ','');
        let Jwt_Helper = new Jwt(token);
        const decoded = await Jwt_Helper.verify();
        req.user = decoded;
        next();
    } catch (error) {
        //if invalid token
        return res.status(401).json({
            response: false,
            message: error.message,
            data: req.body
        });
    }
}

export { authenticated }