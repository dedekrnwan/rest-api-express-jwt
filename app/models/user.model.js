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
    },
    telephone: {
        type: String,
    },
    address: {
        type: String,
    },
    category: {
        type: String,
    },
    created_date: {
        type: Date,
    },
    created_by_id: {
        type: (new mongoose.Schema).Types.ObjectId,
        ref: 'users'
    },
    created_date: {
        type: Date,
    },
    updated_by_id: {
        type: (new mongoose.Schema).Types.ObjectId,
        ref: 'users'
    },
}));

export { Schema }