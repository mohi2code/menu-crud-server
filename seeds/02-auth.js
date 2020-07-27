const {
  v4: uuidv4
} = require('uuid');
const bcrypt = require('bcrypt');

exports.seed = async function (knex) {
  await knex('user_account').del();

  await knex('user_account').insert({
    id: uuidv4(),
    email: 'mohi@email.com',
    password: await bcrypt.hashSync('mohi123', 8)
  });

};