const express = require('express');
const router = express.Router();
const {
    getUserByEmail,
    addUser
} = require('../db/queries');
const {
    v4: uuidv4
} = require('uuid');
const bcrypt = require('bcrypt');
const {
    validateRegister
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

module.exports = router;