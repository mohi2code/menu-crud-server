require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DB_CONNECTION_STRING,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};