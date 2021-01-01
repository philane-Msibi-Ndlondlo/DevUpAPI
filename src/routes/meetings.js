const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const Meeting = require("../models/Meeting");
const Auth = require("../helpers/verifyToken");

router.post("/addMeeting", Auth, (req, res) => {

    const meetingJoiSchema = Joi.object({
        title: Joi.string().required().trim().min(2),
        description: Joi.string().required().trim().min(2),
        meetingFromTime: Joi.string().required().trim().min(2),
        meetingToTime: Joi.string().required().trim().min(2),
        meetingDate: Joi.string().required().trim().min(2),
        attendees: Joi.array().required(),
        organizer: Joi.string().required().trim().min(2).email(),
        location: Joi.string().required().trim().min(2),
    });

    const { error } = meetingJoiSchema.validate(req.body);

    if ( error ) return res.json({ error: error.details[0].message });

    let meeting = new Meeting(req.body);
    res.json(meeting);

    meeting.save().then(meetingTask => res.json(meetingTask))
    .catch(err => console.log(err));
});

router.get("/getMeetings/:useremail", Auth, (req, res) => {
    let allMeetings = [];
    Meeting.find({organizer: req.params.useremail}, (err, userMeetings) => {

        allMeetings = [...allMeetings, ...userMeetings];
    });

    Meeting.find().then(meetings => {
        let userMeetings = [];
        meetings.forEach(meeting => {
            //console.log(meeting);
             meeting.attendees.forEach(attendee => {
                return (attendee.email === req.params.useremail && meeting.organizer !== req.params.useremail) ? (!allMeetings.includes(meeting)) ? allMeetings.push(meeting) : null : null;
            } );
        });
        //allMeetings = [...allMeetings, ...userMeetings];
        return res.json(allMeetings);
    })

    
});

router.get("/getSingleMeeting/:meetingId", Auth, (req, res) => {
    Meeting.findById(req.params.meetingId, (err, userMeeting) => {
        res.json(userMeeting);
    });
});

router.delete("/:meetingId/delete", Auth, (req, res) => {
    res.send({ message: "Delete Meeting per ID"});
});

router.post("/:meetingId/update", Auth, (req, res) => {
    res.send({ message: "Update Meeting per ID"});
});


module.exports = router;