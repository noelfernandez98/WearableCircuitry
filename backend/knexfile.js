require('dotenv').config()

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'wearable-circuitry',
      user: 'postgres',
      password: ''
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      database: 'wearable_circuitry',
      user: 'postgres',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
