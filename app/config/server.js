require('dotenv').config();

const _app = () =>{
    return {
        app_name: process.env.APP_NAME,
        app_env: process.env.APP_ENV,
        app_port: process.env.APP_PORT
    }
}
export const server = _app()