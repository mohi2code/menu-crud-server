const express = require('express');
const router = express.Router();
const {
    getUserByEmail,
    addUser,
    updateUser
} = require('../db/queries');
const {
    v4: uuidv4
} = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    validateRegister,
    validateLogin
} = require('./middleware');

router.post('/register', validateRegister, async (req, res, next) => {
    try {
        const exists = await getUserByEmail(req.body.email);
        if (exists)
            throw new Error('User already exists ☠');
        const user_email = await addUser({
            id: uuidv4(),
            email: req.body.email,
            password: await bcrypt.hashSync(req.body.password, 8)
        });
        res.json({
            email: user_email
        });
    } catch (error) {
        next(error);
    }
});

router.post('/login', validateLogin, async (req, res, next) => {
    try {
        const user = await getUserByEmail(req.body.email);
        if (!user)
            throw new Error('Invalid Login ☠');

        const match = bcrypt.compareSync(req.body.password, user.password);
        if (!match)
            throw new Error('Invalid Login ☠');

        const update = await updateUser(user.id, {
            last_login: new Date().toISOString()
        });

        const token = jwt.sign({
            email: update.email
        }, process.env.JWT_SECRET);

        res.json({
            token
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;