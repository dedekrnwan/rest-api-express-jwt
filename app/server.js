import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import routes from "./routes/routes";
import morgan from "morgan";

import { config } from "./config/app";

const app = express()

//#region Connection db
mongoose.connect(config.database.mongodb.url, {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log(`MongoDB Connecting to ${config.database.mongodb.url}`);
    }else{
        console.log(`Error in connection : ${err}`);
    }
})
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
        error: {
            message: error.message
        }
    })
    //Response to us

})
//#endregion

//#region Server
app.listen(config.server.APP_PORT, () => console.log(`${config.server.APP_NAME} app listening on port ${config.server.APP_PORT}!`))
//#endregion
