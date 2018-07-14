const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const connect        = require('connect');
const cookieParser   = require('cookie-parser');

const app            = express();
const port = 3000;
app.use(connect.cookieParser());
app.use(connect.session({ secret: 'your secret here'} ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
MongoClient.connect(db.url, (err, database) => {

  var db = database.db('notess');
  const user = {
    login: 'admin',
    password: 123456
  }
  db.collection('users').removeMany({login: 'admin'}, (err, resultis) =>{
    if (err) {return console.log(err);}
  })
  db.collection('users').insertOne(user, (err, results) => {
    if (err) {return console.log(err);}
    console.log(results.ops);
  });
  if (err) return console.log(err)
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})
