const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/db');
const session = require('express-session');
const admin = require('./config/mongoose');
const user = require('./config/mongoose');
const validator = require('validator');

const  dotenv  =  require ('dotenv').config({path: '/base.env'});
// заінітить dotenv з важливими енвайрмент змінними
// https://github.com/motdotla/dotenv

const app = express();
const port = 3000;

app.set('trust proxy', 1); // trust first proxy

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/*app.use(
  session({
    secret: process.env.secret,
    cookie: process.env.cookie,
    store: new (require('express-sessions'))({
      storage: process.env.storage,
      // взяти дані з .env
      host: process.env.host,
      port: process.env.port,
      db: process.env.db,
      collection: process.env.collection,
      expire: process.env.expire
    })
  })
);*/
// use mongoose і винести в окремий модуль++

    // ++переписать щоб виконати послідовність дій: remove, then insert


        require('./app/routes')(app, admin, validator, user);
        app.listen(port, () => {
          console.log('We are live on ' + port);
        });
