// ізбавитись від app,db , заюзать http://expressjs.com/ru/4x/api.html#router
'use strict';

const Validator = require('./../libs/Validator');

module.exports = app => {
  app.post('/login', (req, res) => {
    const { login, password } = req.body;

    const validate = new Validator(
      { login, password },
      {
        login: 'required|in:admin',
        password: 'required|in:123456'
      }
    );

    const objectDataPage = {
      title: 'Login page',
      errors: []
    };

    validate.fails(function() {
      objectDataPage.title = 'Error';
      objectDataPage.errors = validate.errors.all();
      res.render('pages/auth/login', objectDataPage);
    });

    validate.passes(function() {
      res.render('pages/auth/login', objectDataPage);
    });
  });

  app.get('/logup', (req, res) => {
    res.render('pages/logup', {
      title: 'Log Up',
      error: 0
    });
  });
  app.post('/logup', (req, res, next) => {
    let j = 0;
    const { login, password, password2 } = req.body;

    // пошук по логіну в бд (count)
    user.find().count(function(err, count) {
      throw new Error('user exist');

      if (err) next(err);
      if (
        // переписать під валідатор
        validator.isLength(login, { min: 3, max: undefined }) == true &&
        validator.isLength(password, { min: 6, max: undefined }) == true &&
        validator.isLength(password2, { min: 6, max: undefined }) == true &&
        password === password2
      ) {
        users.forEach(userNumber => {
          if (login == userNumber.login) {
            console.log(123);
            j++;
            res.render('pages/logup', {
              title: 'Log Up',
              error: 1,
              errorContent: 'Пользователь с таким логилом уже зарегистрирован!'
            });
          }
        });
        if (j == 0) {
          var person = new user({
            login: login,
            password: password
          });
          person.save(err => {
            if (err) throw err;
          });
          console.log(person);
          res.send('ok');
        }
      } else {
        res.render('pages/logup', {
          title: 'Log Up',
          error: 0
        });
      }
    });
  });
  // розібратись  з індексною сторінкою
  app.get('/', (req, res) => {
    res.render('pages/home', {
      title: 'Home page'
    });
  });
};
