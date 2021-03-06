const express = require('express');

const router = express.Router();

const {
    v4: uuidv4
} = require('uuid');
const {
    validateId,
    validateFood
} = require('./middleware');
const {
    listFood,
    getFood,
    addFood,
    updateFood,
    deleteFood
} = require('../db/queries')

router.get('/', async (req, res, next) => {
    try {
        const foodItems = await listFood();
        if (!foodItems) {
            next();
            return;
        }
        res.json(foodItems);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', validateId, async (req, res, next) => {
    try {
        const food = await getFood(req.params.id);
        if (!food) {
            next();
            return;
        }
        res.json(food);
    } catch (error) {
        next(error);
    }
});

router.post('/', validateFood, async (req, res, next) => {
    try {
        const id = await addFood({
            id: uuidv4(),
            ...req.body
        });
        res.json({
            id
        });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', validateId, validateFood, async (req, res, next) => {
    try {
        delete req.body['id'];
        const food = await updateFood(req.params.id, req.body);
        res.json(food);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', validateId, async (req, res, next) => {
    try {
        const food = await deleteFood(req.params.id);
        res.json(food);
    } catch (error) {
        next(error);
    }
});

module.exports = router;