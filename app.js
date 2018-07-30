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

require('./app/routes')(app);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
