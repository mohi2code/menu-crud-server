exports.up = async function (knex) {
    await knex.schema.createTable('user_account', table => {
        table.uuid('id').primary();
        table.text('email').notNullable().unique();
        table.text('password').notNullable();
        table.datetime('last_login');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('user_account');
};