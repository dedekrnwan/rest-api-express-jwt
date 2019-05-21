import express from "express";
import bodyparser from "body-parser";
import routes from "../app/routes/routes";
import morgan from "morgan";

import { config } from "../app/config/app";

const app = express()

//#region Connection db
config.connection.fractal()
//#endregion

//#region Middlewares
app.use(morgan('combined'))

app.use(bodyparser.urlencoded({
    extended: true  
}));
app.use(bodyparser.json());
//#endregion

//#region Routes
app.use(routes)
//#endregion

//#region 4040 error handler
app.use((req, res, next) => {
    let error = new Error('Not Found');
    error.status = 400;
    return next(error);
})
//#endregion

//#region Error handler
app.use((err, req, res, next) => {
    let error = app.get('env') == 'development' ? err : {};
    let status = err.status || 500;
    //Response to client
    res.status(status).json({
        response: false,
        message: error.message,
        data: {
            message: error
        }
    })
    //Response to us

})
//#endregion

//#region Server
app.listen(config.server.app_port, () => console.log(`${config.server.app_name} app listening on port ${config.server.app_port}!`))
//#endregion
