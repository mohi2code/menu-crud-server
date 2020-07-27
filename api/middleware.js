const {
    getUserByEmail
} = require('../db/queries');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

function validateId(req, res, next) {
    try {
        const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.id);
        if (!valid)
            throw new Error('Invalid ID ☠');

        next();
    } catch (error) {
        next(error)
    }
}

function validateFood(req, res, next) {
    try {
        const {
            name,
            description,
            category_id,
            price,
            calories,
            image
        } = req.body;

        if (typeof name == 'string') {
            if (name.trim() == '')
                throw new Error('Invalid name value ! ☠');
        } else {
            throw new Error('Invalid name value ! ☠');
        }

        if (typeof description != 'string')
            throw new Error('Invalid description value ! ☠');

        if (isNaN(price))
            throw new Error('Invalid price value ! ☠');

        if (isNaN(calories))
            throw new Error('Invalid calories value ! ☠');

        if (typeof image != 'string')
            throw new Error('Invalid image url ! ☠');

        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(category_id))
            throw new Error('Invalid category_id ! ☠');

        next();
    } catch (error) {
        next(error);
    }
}

function validateCategory(req, res, next) {
    try {
        if (typeof req.body.name == 'string') {
            if (req.body.name.trim() == '')
                throw new Error('Invalid name property ! ☠');
        } else {
            throw new Error('Invalid name property ! ☠');
        }
        next();
    } catch (error) {
        next(error);
    }
}

async function validateRegister(req, res, next) {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            password_repeat: Joi.ref('password'),
        }).with('password', 'password_repeat');
        await schema.validateAsync(req.body);

        next();
    } catch (error) {
        next(error);
    }
}

async function validateLogin(req, res, next) {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        }).with('email', 'password');
        await schema.validateAsync(req.body);

        next();
    } catch (error) {
        next(error);
    }
}

async function isLogin(req, res, next) {
    try {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(' ')[1];
            if (!token)
                throw new Error('Unauthorized 🔒');
            await jwt.verify(token, process.env.JWT_SECRET, async (err, token) => {
                if (err)
                    throw new Error('Invalid Token ☠');
                const user = await getUserByEmail(token.email);
                if (!user)
                    throw new Error('Unauthorized 🔒');
                next();
            });
        } else {
            throw new Error('Unauthorized no token specified 🔒');
        }
    } catch (error) {
        error.status = 401;
        next(error);
    }
}

module.exports = {
    validateId,
    validateFood,
    validateCategory,
    validateRegister,
    validateLogin,
    isLogin
}