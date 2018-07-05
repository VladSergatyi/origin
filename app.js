const express = require('express');
const bodyParser = require('body-parser');
const MongoClient    = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/example';
MongoClient.connect(url).then(function (client) { // <- db as first argument
    const db = client.db('Loog');
    const collection = db.collection('users');
    let userOne = {
      login: 'Vlados',
      password: '123456'
    };
    collection.insertOne(userOne, function (err, result) {
      if (err) {
        return console.log(err);
      }
      app.post('/login2', urlencodedParser, function (req, res) {
        if (req.body.login == result.ops[0].login && req.body.password == result.ops[0].password) {
          res.send('Вы вошли на сайт');
        } else {
          res.sendFile(__dirname + '/static/index.html');
        }
      });
    })
  });
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use('/', express.static('static'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/static/index.html');
});
app.listen(3000, '127.0.0.1', function () {
  console.log('Server listening port 3000');
});
