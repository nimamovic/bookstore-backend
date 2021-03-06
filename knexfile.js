module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'root',
        database : 'bookstore',
        port: 3306
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: `${ __dirname }/knex/migrations`
      },
      seeds: {
        directory: `${ __dirname }/knex/seeds/development`
      }
    },
    test: {
      client: 'mysql',
      connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'root',
        database : 'test',
        port: 3306
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: `${ __dirname }/knex/migrations`
      },
      seeds: {
        directory: `${ __dirname }/knex/seeds/test`
      }
    }
  }
