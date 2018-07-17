// ізбавитись від app,db , заюзать http://expressjs.com/ru/4x/api.html#router
module.exports = function(app, admin, validator, user) {
  var j = 0;
  app.post('/login', (req, res) => {
    const { login, password } = req.body;
      if (validator.isLength(login ,{min:3, max: undefined}) == true &&
      validator.isLength(password ,{min:6, max: undefined}) == true  ){
    // написать валідацію вхідних даних
    // логін - мін 3 символа, пароль мінімум 6, всі поля обовязкові
    // https://github.com/skaterdav85/validatorjs
    // або https://validatejs.orgmodule/
        // прибрати []   ++
        if (login === admin.login && password === admin.password) {
          // req.session.username = result[0]._id; // primary idx
//          req.session.user = admin.module._id;
          // редірект на /cabinet
    //      res.json({ 1: 2 });
           res.send('Вы прошли авторизацию');
        } else {
          // заюзать .render +
          // https://pugjs.org/api/getting-started.html
          // https://github.com/janl/mustache.js/
          res.render('pages/home',{
            title: 'Home page'
        });
        }
}
else {
  res.render('pages/home',{
    title: 'Home page'
});
}
  });
  app.get('/logup', (req, res) => {
    res.render('pages/logup',{
      title: 'Log Up',
      error: 0
  });
});
app.post('/logup', (req, res) => {
  const { login, password, password2} = req.body;
user.find().exec(function(err, users) {
        if (err) throw err;
        if (validator.isLength(login ,{min:3, max: undefined}) == true &&
        validator.isLength(password ,{min:6, max: undefined}) == true &&
      validator.isLength(password2 ,{min:6, max: undefined}) == true &&
    password === password2) {
          users.forEach((userNumber) => {
            if (login == userNumber.login) {
              console.log(123);
              j++;
              res.render('pages/logup',{
                title: 'Log Up',
                error: 1,
                errorContent: 'Пользователь с таким логилом уже зарегистрирован!'
            });
            }
          });
          if (j==0) {
          var person = new user ({
            login: login,
            password: password
          });
          person.save((err) => {
            if (err) throw err;
          })
          console.log(person);
          res.send('ok');
        }
        }
        else {
          res.render('pages/logup',{
            title: 'Log Up',
              error: 0
        });
        }
    });
});
  app.get('/cabinet', (req, res) => {
    res.json({ sess: req.session.user });
  });
  // розібратись  з індексною сторінкою
  app.get('/', (req, res) => {
    res.render('pages/home',{
      title: 'Home page'
  });
  });
};
