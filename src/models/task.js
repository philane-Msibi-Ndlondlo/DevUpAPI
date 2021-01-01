const express = require("express");
const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        min: 2
    },
    description: {
        type: String,
        required: true,
        trim: true,
        min: 2
    },
    taskDate : {
        type: String,
        required: true,
        trim: true,
    },
    taskTime: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user_email: {
        type: String,
        required: true,
        trim: true,
        min: 2
    }

}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);