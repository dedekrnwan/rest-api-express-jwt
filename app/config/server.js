require('dotenv').config();

const _app = () =>{
    return {
        APP_NAME: process.env.APP_NAME,
        APP_ENV: process.env.APP_ENV,
        APP_PORT: process.env.APP_PORT
    }
}
export const server = _app()