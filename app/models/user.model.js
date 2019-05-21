import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import { jwt as configJwt } from "./../config/app"
import fs from "fs"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    username: {
        type: String,
    },
    birthdate: {
        type: Date,
    },
    phone: {
        type: String,
        "default": null
    },
    telephone: {
        type: String,
        "default": null
    },
    address: {
        type: String,
        "default": null
    },
    category: {
        type: String,
        "default": null
    },
    created_date: {
        type: Date,
        "default": Date.now
    },
    created_by_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        "default": null
    },
    updated_date: {
        type: Date,
        "default": Date.now
    },
    updated_by_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        "default": null
    },
});

UserSchema.statics.generateAuthToken  = function() {
    return jwt.sign({
        _id: this._id,
        iss: 'http://localhost/',
        aud: 'http://localhost',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, configJwt.secretKey)
};

const Schema = mongoose.model('User', UserSchema);

export { Schema }