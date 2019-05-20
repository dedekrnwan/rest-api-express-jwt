import mongoose from "mongoose";

const Schema = mongoose.model('users', new mongoose.Schema({
    email: {
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
}));

export { Schema }