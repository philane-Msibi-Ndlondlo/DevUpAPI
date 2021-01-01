const express = require("express");
const mongoose = require("mongoose");

const InnovationSchema = new mongoose.Schema({

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
    idealist: {
        type: String,
        required: true,
        trim: true,
        min: 2
    },

}, { timestamps: true });

module.exports = mongoose.model("Innovation", InnovationSchema);