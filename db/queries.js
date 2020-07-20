const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
const db = require('knex')(config);

module.exports = {
    listFood: async function () {
        const fields = ['food.id', 'food.name', 'food.description',
            'food.price', 'food.image', 'food.calories',
            'category.id as category_id', 'category.name as category_name'
        ];
        return await db('food')
            .select(fields)
            .innerJoin('category', 'food.category_id', 'category.id');
    },

    getFood: async function (id) {
        const fields = ['food.id', 'food.name', 'food.description',
            'food.price', 'food.image', 'food.calories',
            'category.id as category_id', 'category.name as category_name'
        ];
        return await db('food')
            .select(fields)
            .where('food.id', id)
            .innerJoin('category', 'food.category_id', 'category.id')
            .first();
    },

    addFood: async function (food) {
        const trx = await db.transaction();
        const food_db = await db('food')
            .transacting(trx).insert(food, 'id');
        await trx.commit();
        return food_db[0];
    },

    listCategories: async function () {
        return await db('category');
    },

    getCategory: async function (id) {
        const fields = ['food.id as id', 'food.name', 'food.description',
            'food.price', 'food.image', 'food.calories',
            'category.id as category_id', 'category.name as category_name'
        ];
        return await db('category')
            .select(fields)
            .where('category.id', id)
            .innerJoin('food', 'category.id', 'food.category_id');
    },

    addCategory: async function (name) {
        const trx = await db.transaction();
        const category = await db('category')
            .transacting(trx).insert(name, 'id');
        await trx.commit();
        return category[0];
    }
};