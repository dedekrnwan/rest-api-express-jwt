import express from "express"

//routes
import users from "./api/user.routes"
import auth from "./api/auth.routes"

const router = express.Router()

//use
router.use('/user', users);
router.use('/auth', auth);

export default router
