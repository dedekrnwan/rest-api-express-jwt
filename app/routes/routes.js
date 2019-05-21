import express from "express"
import { authenticated } from "./../middlewares/auth"

//routes
import users from "./api/user.routes"
import auth from "./api/auth.routes"

const router = express.Router()

//use
router.use(
    '/user', 
    authenticated,
    users
);
router.use('/auth', auth);

export default router
