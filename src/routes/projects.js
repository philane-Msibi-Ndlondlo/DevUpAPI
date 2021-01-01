const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const Project = require("../models/project");
const Auth = require("../helpers/verifyToken");

router.post("/addProject", Auth, (req, res) => {
    console.log("ff");

    const projectJoiSchema = Joi.object({
        title: Joi.string().required().trim().min(2),
        description: Joi.string().required().trim().min(2),
        projectFromDate: Joi.string().required().trim().min(2),
        projectToDate: Joi.string().required().trim().min(2),
        assignees: Joi.array().required(),
        assigner: Joi.string().required().trim().min(2).email(),
        todos: Joi.array(),
    });

    const { error } = projectJoiSchema.validate(req.body);

    if ( error ) return res.json({ error: error.details[0].message });

    let project = new Project(req.body);

    project.save().then(savedProject => res.json(savedProject))
    .catch(err => console.log(err));
});

router.get("/getProjects", Auth, (req, res) => {
    Project.find((err, userProjects) => {
        res.json(userProjects);
    });
});

router.get("/getSingleProject/:ProjectId", Auth, (req, res) => {
    Project.findById(req.params.ProjectId, (err, userProject) => {
        res.json(userProject);
    });
});

router.post("/addTodoInProject/:ProjectId", Auth, (req, res) => {
    Project.findById(req.params.ProjectId, (err, userProject) => {
        if (userProject === null) {
            res.json({ error: `Project doesn't exist.`});
            return;
        }

        let newTodos = [...userProject.todos, req.body];

        Project.updateOne({_id: userProject._id}, {$set: { todos: newTodos }}, (err, updatedProject) => {
            if (err) { res.json({ error: err }); return; }
            res.json(updatedProject);
        });
    });
});

router.delete("/:ProjectId/delete", Auth, (req, res) => {
    res.send({ message: "Delete Project per ID"});
});

router.post("/:ProjectId/update", Auth, (req, res) => {
    res.send({ message: "Update Project per ID"});
});


module.exports = router;