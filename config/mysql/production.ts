export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: false,
    individualHooks: true,
    replication: {
      master: {
        host: process.env.DB_HOST || 'masterHost',
        port: process.env.DB_PORT || 3306,
        username: process.env.DB_USER || 'username',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'dbname',
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
