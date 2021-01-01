const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        trim: true,
        min: 2,
        required: true,
    },
    lastname: {
        type: String,
        trim: true,
        min: 2,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        min: 2,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 2048,
        trim: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema);