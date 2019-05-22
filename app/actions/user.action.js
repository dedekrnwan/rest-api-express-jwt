import { Schema as User } from "../models/user.model";

const _app = () => {
    return {
        index: async (req, res, next) => {
            try {
                let promise = await User.find();
                res.status(200).json({
                    response: true,
                    message: `User successfully retrieve`,
                    data: promise
                })
            } catch (error) {
                return next(error);
            }
        },
        store: async (req, res, next) => {
            try {
                let user = new User(req.body);
                user = await user.save(); 
                res.status(200).json({
                    response: true,
                    message: `User successfully stored`,
                    data: user
                })
            } catch (error) {
                return next(error);
            }
        },
        details: async (req, res, next) => {
            try {
                let promise = await User.findById(req.params.id);
                if(promise){
                    res.status(200).json({
                        response:  true,
                        message: `User successfully retrieve`,
                        data: promise
                    })
                }else{
                    res.status(200).json({
                        response:  false,
                        message: `User failed retrieve`,
                        data: promise
                    })
                }
            } catch (error) {
                return next(error);
            }
        },
        update: async (req, res, next) => {
            try {
                let user = await User.findByIdAndUpdate(req.params.id, req.body);
                user = await User.findById(req.params.id);
                //handle transaction
                res.status(200).json({
                    response:  true,
                    message: `User successfully updated`,
                    data: user
                })
            } catch (error) {
                //handle transaction
                next(error);
            }
        },
        delete: async (req, res, next) => {
            try {
                let user = await User.findOneAndRemove(req.params.id);
                //handle transaction
                res.status(200).json({
                    response:  true,
                    message: `User successfully deleted`,
                    data: user
                })
            } catch (error) {
                //handle transaction
                next(error);
            }
        }
    }
}


export const UserAction = _app();