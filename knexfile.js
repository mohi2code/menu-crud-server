require('dotenv').config()
const pg = require('pg')
pg.defaults.ssl = {
  rejectUnauthorized: false,
}

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    }
  }

};