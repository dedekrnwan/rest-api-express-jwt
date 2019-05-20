import express from "express"

//routes
import users from "./modules/user.routes"

const router = express.Router()

//use
router.use('/user', users);

export default router
