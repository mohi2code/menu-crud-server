exports.up = async function (knex) {
    await knex.schema.createTable('category', table => {
        table.uuid('id').primary();
        table.text('name').notNullable().unique();
    });

    await knex.schema.createTable('food', table => {
        table.uuid('id').primary();
        table.text('name').notNullable().unique();
        table.text('description');
        table.uuid('category_id').references('category.id');
        table.float('price').notNullable().defaultTo(0.0);
        table.text('image');
        table.float('calories').defaultTo(0.0);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('food');
    await knex.schema.dropTableIfExists('category');
};