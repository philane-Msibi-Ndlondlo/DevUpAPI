const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const Task = require("../models/task");
const Auth = require("../helpers/verifyToken");

router.post("/addTask", Auth, (req, res) => {

    console.log("ngena");

    const taskJoiSchema = Joi.object({
        title: Joi.string().required().trim().min(2),
        description: Joi.string().required().trim().min(2),
        taskDate: Joi.string().required().trim().min(2),
        taskTime: Joi.string().required().trim().min(2),
        completed: Joi.bool(),
        user_email: Joi.string().required().trim().min(2).email(),
    });

    console.log("done val");

    const { error } = taskJoiSchema.validate(req.body);

    if ( error ) return res.json({ error: error.details[0].message });

    let task = new Task(req.body);
    console.log(task);

    task.save().then(savedTask => res.json({savedTask, error: ''}))
    .catch(err => console.log(err));
});

router.get("/getTasks/:useremail", Auth, (req, res) => {

    Task.find({user_email: req.params.useremail}, (err, userTasks) => {
        res.json(userTasks);
    });

});

router.get("/getTask/:taskId", Auth, (req, res) => {
    Task.findById(req.params.taskId, (err, userTask) => {
        res.json(userTask);
    });

});

router.get("/toggleTask/:taskId", Auth, (req, res) => {
    Task.findOne({_id: req.params.taskId}, (err, foundTask) => {
        if ( foundTask ) {
            foundTask.completed = !foundTask.completed;
            foundTask.save().then(updateTask => res.json(updateTask));
        }
    });
});

router.delete("/deleteTask/:taskId", Auth, (req, res) => {
    Task.findByIdAndDelete(req.params.taskId, (err, userTask) => {
        res.json(userTask);
    });
});

router.post("/updateTask", Auth, (req, res) => {
    /* Task.findOne({_id: req.body._id}, (err, foundTask) => {
        if ( foundTask ) {
            foundTask. = !foundTask.completed;
            foundTask.save().then(updateTask => res.json(updateTask));
        }
    }); */
});


module.exports = router;