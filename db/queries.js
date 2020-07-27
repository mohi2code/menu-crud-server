const {
    func
} = require('@hapi/joi');

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
            .innerJoin('category', 'food.category_id', 'category.id')
            .orderBy([{
                column: 'food.category_id'
            }]);
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

    updateFood: async function (id, category_update) {
        const trx = await db.transaction();
        const food = await db('food')
            .transacting(trx).update(category_update, '*').where('id', id);
        await trx.commit();
        return food[0];
    },

    deleteFood: async function (id) {
        const trx = await db.transaction();
        const food = await db('food')
            .transacting(trx).delete().where('id', id);
        await trx.commit();
        return food;
    },

    listCategories: async function () {
        return await db('category')
            .orderBy('id');
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
            .transacting(trx).insert(name, '*');
        await trx.commit();
        return category[0];
    },

    updateCategory: async function (id, name) {
        const trx = await db.transaction();
        const category = await db('category')
            .transacting(trx).update(name, '*').where('id', id);
        await trx.commit();
        return category[0];
    },

    deleteCategory: async function (id) {
        const trx = await db.transaction();
        await db('food').transacting(trx)
            .delete().where('category_id', id);
        const category = await db('category')
            .transacting(trx).delete().where('id', id);
        await trx.commit();
        return category;
    },

    getUserByEmail: async function (email) {
        return (await db('user_account').where('email', email))[0];
    },

    addUser: async function (user) {
        const trx = await db.transaction();
        const user_db = await db('user_account')
            .transacting(trx)
            .insert(user, 'email');
        await trx.commit();
        return user_db[0];
    }
};