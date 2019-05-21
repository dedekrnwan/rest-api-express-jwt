import { Schema as User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwt as configJwt } from "./../config/app";

const _app = () => {
    return {
        login: async (req, res, next) => {
            try {
                let user = await User.findOne({
                    email: req.body.email
                });
                if(user){
                    let check = await bcrypt.compare(req.body.password, user.password);
                    if(check){
                        let token = await jwt.sign(configJwt.payLoad, configJwt.secretKey);
                        res.status(200).json({
                            response: true,
                            message: `User successfully login`,
                            data: {
                                token: token,
                                // user: user
                            }
                        })
                    }else{
                        res.status(200).json({
                            response: false,
                            message: `Email or password is invalid`,
                            data: user
                        })
                    }
                }else{
                    res.status(200).json({
                        response: false,
                        message: `Email or password is invalid`,
                        data: user
                    })
                }
               
            } catch (error) {
                return next(error);
            }
        },
        register: async (req, res, next) => {
            try {
                req.body['password'] = await bcrypt.hash(req.body['password'], 10);
                let user = new User(req.body);
                user = await user.save(); 
                res.status(200).json({
                    response: true,
                    message: `User successfully registered`,
                    data: user
                })
            } catch (error) {
                return next(error);
            }
        },
        forgot: async (req, res, next) => {
            try {
                res.status(200).json({
                    response: true,
                    message: `User successfully stored`,
                    data: user
                })
            } catch (error) {
                return next(error);
            }
        },
        reset: async (req, res, next) => {
            try {
                res.status(200).json({
                    response: true,
                    message: `User successfully stored`,
                    data: user
                })
            } catch (error) {
                return next(error);
            }
        },
        logout: async (req, res, next) => {
            try {
                res.status(200).json({
                    response: true,
                    message: `User successfully stored`,
                    data: user
                })
            } catch (error) {
                return next(error);
            }
        }
    }
}


export const AuthAction = _app();