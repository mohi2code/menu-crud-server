const express = require('express');

const router = express.Router();

const {
    listCategories,
    getCategory
} = require('../db/queries');

router.get('/', async (req, res, next) => {
    try {
        const categories = await listCategories();
        res.json(categories);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        if (!isUUID(req.params.id))
            throw new Error('Invalid ID ☠')

        const category = await getCategory(req.params.id);
        res.json(category);
    } catch (error) {
        next(error);
    }
});

function isUUID(uuid) {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
}

module.exports = router;