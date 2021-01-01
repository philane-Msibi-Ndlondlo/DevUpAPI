const express = require("express");
const mongoose = require("mongoose");

const assignee = new mongoose.Schema({
    email: { type: String, required: true, min: 2, trim: true }
});

const todo = new mongoose.Schema({
    title: { type: String, min: 2, trim: true },
    description: { type: String, min: 2, trim: true },
    completed: { type: Boolean, default: false, },
    assignee: { type: String, min: 2, trim: true }
});

const projectSchema = new mongoose.Schema({

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
    projectFromDate: {
        type: String,
        required: true,
        trim: true,
    },
    projectToDate: {
        type: String,
        required: true,
        trim: true,
    },
    assignees: {
        type: [assignee],
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    assigner: {
        type: String,
        required: true,
        trim: true,
        min: 2
    },
    todos: {
        type: [todo],
    }

}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);