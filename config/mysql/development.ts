export const config = {
  db: {
    type: process.env.DB_TYPE || 'mysql',
    synchronize: false,
    logging: true,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3308,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'application',
    autoLoadEntities: true,
  },
  individualHooks: true,
  foo: 'dev-bar',
}
