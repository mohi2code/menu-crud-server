const express = require('express');

const router = express.Router();

const {
    listFood
} = require('../db/queries')

router.get('/', async (req, res, next) => {
    try {
        const foodItems = await listFood();
        res.json(foodItems);
    } catch (error) {
        next(error)
    }
});

module.exports = router;