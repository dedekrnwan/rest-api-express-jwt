import express from "express";
import { UserAction } from "./../../actions/user.action";

const router = express.Router()

router.route('/')
    .get(UserAction.index)


export default router