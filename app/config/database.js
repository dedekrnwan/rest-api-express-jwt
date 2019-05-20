require('dotenv').config();

const _app = () =>{
    return {
        mongodb: {
            url: `${process.env.MONGO_DB_DEFAULT_URL}:${process.env.MONGO_DB_DEFAULT_PORT}/${process.env.MONGO_DB_DEFAULT_SCHEMA}`,
            port: process.env.MONGO_DB_DEFAULT_PORT,
            schema: process.env.MONGO_DB_DEFAULT_SCHEMA,
        }
    }
}
export const database = _app()