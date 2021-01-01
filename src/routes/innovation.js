const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const Innovation = require("../models/innovation");
const Auth = require("../helpers/verifyToken");

router.post("/addInnovation", Auth, (req, res) => {
    console.log("ff");

    const innovationJoiSchema = Joi.object({
        title: Joi.string().required().trim().min(2),
        description: Joi.string().required().trim().min(2),
        idealist: Joi.string().required().trim().min(2).email(),
    });

    const { error } = innovationJoiSchema.validate(req.body);

    if ( error ) return res.json({ error: error.details[0].message });

    let innovation = new Innovation(req.body);

    innovation.save().then(savedInnovation => res.json(savedInnovation))
    .catch(err => console.log(err));
});

router.get("/getInnovations", Auth, (req, res) => {
    Innovation.find((err, userInnovations) => {
        res.json(userInnovations);
    });
});


module.exports = router;