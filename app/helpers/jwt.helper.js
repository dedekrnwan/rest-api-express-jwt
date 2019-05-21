import jwt from "jsonwebtoken";
import fs from "fs";
import { jwt as configJwt } from "./../config/app";

class Jwt {
    constructor(data, $options = {}){
        this.data = data;
        this.private = fs.readFileSync(`${__dirname}/../utils/private.key`, 'utf8');
        this.public = fs.readFileSync(`${__dirname}/../utils/public.key`, 'utf8');
        this.options = configJwt.signOptions;
        this.options.issuer = (!$options.issuer) ? this.options.issuer : $options.issuer;
        this.options.subject = (!$options.subject) ? this.options.subject : $options.subject;
        this.options.audience = (!$options.audience) ? this.options.audience : $options.audience;
    }
    //
    async sign(){
        // Token signing options
        let option = {
            issuer:  this.options.issuer,
            subject:  this.options.subject,
            audience:  this.options.audience,
            expiresIn:  "30d",    // 30 days validity
            algorithm:  "RS256"    
        };
        return await jwt.sign(
            this.data, 
            this.private,
            option
        );
    }
    async verify(){
        let option = {
            issuer:  this.options.issuer,
            subject:  this.options.subject,
            audience:  this.options.audience,
            expiresIn:  "30d",
            algorithm:  ["RS256"]
        };
    
        return await jwt.verify(
            this.data, 
            this.public,
            option
        );
    }
    async decode(){
        return await jwt.decode(
            this.data, 
            {
                complete: true
            }
        );
    }
}


export default Jwt