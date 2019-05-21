import joi from "@hapi/joi";

const validator = () => {
    return {
        validate: {
            param: (schema, name) =>{
                return (req, res, next) => {
                    let result = joi.validate({
                        param: req['params'][name]
                    }, schema)
                    if(result.error){
                        return res.status(400).json({
                            response: !result.error.isJoi,
                            message: result.error.name,
                            data: {
                                error: result.error.details[0].message,
                                param: result.error._object.param
                            }
                        })
                    }else{
                        next();
                    }
                }
            },
            body: (schema) => {
                return (req, res, next) => {
                    let result = joi.validate(req.body, schema);
                    if(result.error){
                        return res.status(400).json({
                            response: !result.error.isJoi,
                            message: result.error.name,
                            data: {
                                error: result.error.details,
                            }
                        })
                    }else{
                        next();
                    }
                }
            }
        },
        schemas: {
            object: {
                id:  joi.object().keys({
                    // param: joi.string().regex(/^[0-9a-zA-Z][24]$/).required()
                    param: joi.string().alphanum().min(24).max(24).required()
                }),
            },
            Auth: {
                login: joi.object().keys({
                    email: joi.string().email().required(),
                    password: joi.string().required(),
                })
            },
            User: joi.object().keys({
                email: joi.string().email().required(),
                username: joi.string().required(),
                password: joi.string().required(),
                birthdate: joi.date().required(),
                phone: joi.string(),
                telephone: joi.string(),
                address: joi.string(),
                category: joi.string(),
                email_verify_date: joi.date(),
                password: joi.string().required(),
                remember_token: joi.string(),
                created_date: joi.date(),
                created_by_id: joi.string().alphanum().min(24).max(24),
                updated_date: joi.date(),
                updated_by_id: joi.string().alphanum().min(24).max(24),
            }),
        }
    }
}

export { validator }