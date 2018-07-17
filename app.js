const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

app.set('trust proxy', 1); // trust first proxy
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// app.use(
//   session({
//     secret: process.env.SECRET,
//     cookie: { maxAge: process.env.COOKIE_MAX_AGE },
//     store: new (require('express-sessions'))({
//       storage: 'mongodb',
//       host: process.env.MONGO_HOST,
//       port: process.env.MONGO_PORT,
//       db: 'session-express',
//       collection: 'sessions',
//       expire: 600
//     })
//   })
// );

require('./app/routes')(app);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
