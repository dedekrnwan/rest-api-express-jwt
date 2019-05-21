import { config } from "dotenv";
import mongoose from "mongoose";
//
config();

const _app = () =>{
    return {
        fractal: {
            url: `${process.env.FRACTAL_DEFAULT_URL}:${process.env.FRACTAL_DEFAULT_PORT}/${process.env.FRACTAL_DEFAULT_SCHEMA}`,
            port: process.env.FRACTAL_DEFAULT_PORT,
            schema: process.env.FRACTAL_DEFAULT_SCHEMA,
        }
    }
}
const _connection = () => {
    return {
        fractal : () => {
            mongoose.connect(
                _app().fractal.url, 
                {useNewUrlParser: true}
            );
            mongoose.connection.on('connected', () => {
                console.log(`Mongoose ${_app().fractal.schema} connection is open to ${_app().fractal.url}`);
            });
            mongoose.connection.on('error', (error) => {
                console.log(`Mongoose ${_app().fractal.schema} connection at ${ _app().fractal.url} has occured ${error} error`);
            });
            mongoose.connection.on('disconnected', () => {
                console.log(`Mongoose ${_app().fractal.schema} connection at ${ _app().fractal.url} is disconnected`);
            });
            process.on('SIGINT', function(){
                mongoose.connection.close(function(){
                    console.log(termination(`Mongoose ${_app().fractal.schema} connection is disconnected due to application termination`));
                    process.exit(0)
                });
            });
        }
    }
}
export const database = _app()
export const connection = _connection()