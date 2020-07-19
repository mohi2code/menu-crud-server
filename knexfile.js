require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_CONNECTION_STRING,
  },

};