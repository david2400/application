import {jwtConstants} from '@constants/index'

export const config = {
  db: {
    // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  },
  jwtSecret: jwtConstants.secret,
  jwtRefreshSecret: jwtConstants.jwtRefreshSecret,
  jwtTimeout: '2h',
}
