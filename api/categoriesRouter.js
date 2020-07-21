const express = require('express');

const router = express.Router();

const {
    v4: uuidv4
} = require('uuid');
const {
    validateId,
    validateCategory
} = require('./middleware');
const {
    listCategories,
    getCategory,
    addCategory,
    updateCategory

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

router.post('/', validateCategory, async (req, res, next) => {
    try {
        const category = await addCategory({
            id: uuidv4(),
            name: req.body.name
        });
        res.json(category);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', validateId, validateCategory, async (req, res, next) => {
    try {
        const id = await updateCategory(req.params.id, req.body);
        res.json({
            id
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;