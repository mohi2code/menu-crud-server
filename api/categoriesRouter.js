const express = require('express');

const router = express.Router();

const {
    validateId
} = require('./middleware');
const {
    listCategories,
    getCategory
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

module.exports = router;