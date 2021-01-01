const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../helpers/verifyToken");

router.get("/getUsers", Auth, (req, res) => {
    User.find((err, users) => {
        res.json({users, error: ''});
    });
    
});

router.post("/register", (req, res) => {

    console.log(req.body);

    const userSchema = Joi.object({
        firstname: Joi.string().required().trim().min(2).regex(/^[a-zA-Z]/),
        lastname: Joi.string().required().trim().min(2).regex(/^[a-zA-Z]/),
        email: Joi.string().required().trim().min(2).email(),
        password: Joi.string().required().trim().min(8).max(2048),
    });

    // Validate user data
    const { error } = userSchema.validate(req.body);

    // send validation error to user
    if ( error ) return res.json({error: error.details[0].message});

    // check user in DB TODO
    User.findOne({email: req.body.email}, (err, user) => {

        if ( err ) return console.log(err);

        if ( user ) return res.json({ error: `User already exists with email: ${req.body.email}` });

        // save user in DB
        let userObj = new User(req.body);

        // Encrypt the password
        bcrypt.genSalt(10, ( error, salt ) => {
            if ( error ) return console.log(error);

            bcrypt.hash(userObj.password, salt, ( hashError, hash ) => {

                if ( hashError ) return console.log(hashError);
                userObj.password = hash;

                userObj.save().then(savedUser => res.json({savedUser, error: ''}));
            });
        });
    });
});

router.post("/login", (req, res) => {
    const userSchema = Joi.object({
        email: Joi.string().required().trim().min(2).email(),
        password: Joi.string().required().trim().min(8).max(2048),
    });

    // Validate user data
    const { error } = userSchema.validate(req.body);

    // send validation error to user
    if ( error ) return res.json({error: error.details[0].message});

    // check user in DB TODO
    User.findOne({email: req.body.email}, (err, user) => {

        if ( err ) return console.log(err);

        if ( !user ) return res.json({ error: `Incorrent Details` });

        // save user in DB
        bcrypt.compare(req.body.password, user.password, (err, validPass) => {
            if ( !validPass ) return res.json({error: 'Incorrect Password'});

            let token = jwt.sign( {
                _id: user._id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname
            }, 'DevUpTopSecretPhil');

            res.header("auth-token", token).send({ token, user, error: ''});

        })
    });
});

module.exports = router;