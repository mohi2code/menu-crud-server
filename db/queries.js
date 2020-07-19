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
    }
};