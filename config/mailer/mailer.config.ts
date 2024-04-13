// import {Module} from '@nestjs/common'
// import {MailerModule} from '@nestjs-modules/mailer'
// import {PugAdapter} from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

// @Module({
//   imports: [
//     MailerModule.forRootAsync({
//       useFactory: () => ({
//         transport: {
//           host: process.env.EMAIL_HOST,
//           port: 587,
//           secure: true, // true for 465, false for other ports
//           auth: {
//             user: process.env.EMAIL_ID, // generated ethereal user
//             pass: process.env.EMAIL_PASS, // generated ethereal password
//           },
//         },
//         defaults: {
//           from: '"nest-modules" <modules@nestjs.com>',
//         },
//         template: {
//           dir: __dirname + '/templates',
//           adapter: new PugAdapter(),
//           options: {
//             strict: true,
//           },
//         },
//       }),
//     }),
//   ],
// })
// export class MailerConfigsModule {}
