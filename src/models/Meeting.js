const express = require("express");
const mongoose = require("mongoose");

const attendee = new mongoose.Schema({
    email: { type: String, required: true, min: true, trim: true }
});

const MeetingSchema = new mongoose.Schema({

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
    meetingDate : {
        type: String,
        required: true,
        trim: true,
    },
    meetingFromTime: {
        type: String,
        required: true,
        trim: true,
    },
    meetingToTime: {
        type: String,
        required: true,
        trim: true,
    },
    attendees: {
        type: [attendee],
        default: false,
    },
    organizer: {
        type: String,
        required: true,
        trim: true,
        min: 2
    },
    location: {
        type: String,
        require: true,
        min: 2,
        trim: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("Meeting", MeetingSchema);