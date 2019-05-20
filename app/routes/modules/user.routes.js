import express from "express";
import { UserAction } from "../../actions/user.action";
import { validator } from "./../../helpers/routes.helper";

const router = express.Router()

router.route('/')
    .get(UserAction.index)
    .post(
        validator().validate.body(validator().schemas.User),
        UserAction.store
    );

export default router