import { Schema as User } from "../models/user.model";

const _app = () => {
    return {
        index: async (req, res, next) => {
            try {
                res.status(200).json({
                    response: true,
                    message: `User successfully retrieve`,
                    data: {
                        coba: 'yeay'
                    }
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
        }
    }
}


export const UserAction = _app();