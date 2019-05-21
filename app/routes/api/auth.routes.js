import express from "express";
import { AuthAction } from "../../actions/auth.action";
import { validator } from "../../helpers/routes.helper";
import { authenticated } from "./../../middlewares/auth";

const router = express.Router()

router.route('/login')
    .post(
        validator().validate.body(validator().schemas.Auth.login),
        AuthAction.login
    );
router.route('/register')
    .post(
        authenticated,
        validator().validate.body(validator().schemas.User),
        AuthAction.register
    );

export default router