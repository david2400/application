export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: false,
    individualHooks: true,
    replication: {
      master: {
        host: process.env.DB_HOST || 'mysql',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_DATABASE || 'security',
      },
      slaves: [
        {
          // fix if necessary
          host: 'slaveHost',
          port: 3306,
          username: 'username',
          password: 'password',
          database: 'dbname',
        },
      ],
    },
    extra: {
      connectionLimit: 30,
    },
    autoLoadEntities: true,
  },
  foo: 'pro-bar',
}
