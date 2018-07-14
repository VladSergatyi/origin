// ізбавитись від app,db , заюзать http://expressjs.com/ru/4x/api.html#router
module.exports = function(app, db) {
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ error: 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.post('/login', (req, res) => {
    const { login, password } = req.body;

    // написать валідацію вхідних даних
    // логін - мін 3 символа, пароль мінімум 6, всі поля обовязкові
    // https://github.com/skaterdav85/validatorjs
    // або https://validatejs.org/

    db.collection('users')
      .find() // тільки пошук по логіну ({login: login})
      // пошук лише одного запису (limit: 1)
      .toArray((err, result) => {
        if (err) {
          // повернути помилку
          return console.log(err);
        }
        // прибрати []
        if (login === result[0].login && password === String(result[0].password)) {
          // req.session.username = result[0]._id; // primary idx
          req.session.user = result[0]._id;
          // редірект на /cabinet
          res.json({ 1: 2 });
          // res.send('Вы прошли авторизацию');
        } else {
          // заюзать .render +
          // https://pugjs.org/api/getting-started.html
          // https://github.com/janl/mustache.js/
          res.sendFile(process.env.PWD + '/public/index.html');
        }
      });
  });

  app.get('/cabinet', (req, res) => {
    res.json({ sess: req.session.user });
  });

  // розібратись  з індексною сторінкою
  app.get('/', (req, res) => {
    res.sendFile('index.html');
  });
};
