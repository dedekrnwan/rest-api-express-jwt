import express from "express";
import { UserAction } from "../../actions/user.action";
import { validator } from "../../helpers/validation.helper";

const router = express.Router()

router.route('/')
    .get(
        UserAction.index
    )
    .post(
        validator().validate.body(validator().schemas.User),
        UserAction.store
    );
router.route('/:id')
        .get(
            validator().validate.param(validator().schemas.object.id, 'id'),
            UserAction.details
        )
        .patch(
            validator().validate.param(validator().schemas.object.id, 'id'),
            validator().validate.body(validator().schemas.User),
            UserAction.update
        )
        .delete(
            validator().validate.param(validator().schemas.object.id, 'id'),
            UserAction.delete
        );

export default router