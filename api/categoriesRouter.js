const express = require('express');

const router = express.Router();

const {
    v4: uuidv4
} = require('uuid');
const {
    validateId
} = require('./middleware');
const {
    listCategories,
    getCategory,
    addCategory
} = require('../db/queries');

router.get('/', async (req, res, next) => {
    try {
        const categories = await listCategories();
        if (!categories) {
            next();
            return;
        }
        res.json(categories);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', validateId, async (req, res, next) => {
    try {
        const category = await getCategory(req.params.id);
        if (!category) {
            next();
            return;
        }
        res.json(category);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (typeof req.body.name == 'string') {
            if (req.body.name.trim() == '')
                throw new Error('Invalid name property ! ☠');
        } else {
            throw new Error('Invalid name property ! ☠');
        }
        const id = await addCategory({
            id: uuidv4(),
            name: req.body.name
        });
        res.json({
            id
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;