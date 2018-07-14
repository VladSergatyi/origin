const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const session = require('express-session');

// заінітить dotenv з важливими енвайрмент змінними
// https://github.com/motdotla/dotenv

const app = express();
const port = 3000;

app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 'Q=EQ9d>ScF=?8.=]',
    cookie: { maxAge: 60000 },
    store: new (require('express-sessions'))({
      storage: 'mongodb',
      // взяти дані з .env
      host: 'localhost',
      port: 27017,
      db: 'session-express',
      collection: 'sessions',
      expire: 86400
    })
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// use mongoose і винести в окремий модуль
MongoClient.connect(
  db.url,
  (err, database) => {
    var db = database.db('notess');
    const user = {
      login: 'admin',
      // пароль заенкріптить (bcrypt-nodejs)
      password: 123456
    };
    // переписать щоб виконати послідовність дій: remove, then insert
    db.collection('users').removeMany({ login: 'admin' }, (err, resultis) => {
      if (err) {
        return console.log(err);
      }
    });
    db.collection('users').insertOne(user, (err, results) => {
      if (err) {
        return console.log(err);
      }
      console.log(results.ops);
    });
    if (err) return console.log(err);
    require('./app/routes')(app, db);
    app.listen(port, () => {
      console.log('We are live on ' + port);
    });
  }
);
