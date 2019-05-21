import { database, connection } from "./database";
import { server } from "./server";
import jwt from "./jwt";

export const config = {
    connection: connection,
    database: database,
    server: server,
}
export {
    jwt
}