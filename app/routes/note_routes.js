// ізбавитись від app,db , заюзать http://expressjs.com/ru/4x/api.html#router
'use strict';
const Validator = require('./../libs/Validator');
const mongoose = require('./../../config/mongoose');
module.exports = app => {

  let {user, note} = require("./../../config/mongoose")
  const objectDataPage = {
    title: '',
    errors: []
  };
  app.get('/listNote', (req, res) => {
    note.find().exec((err, result) => {
      if (err) next(err)
      res.json(result);
    })

  });
  app.get('/createNote', (req, res) => {
    res.render('pages/create', objectDataPage);
  });
  app.post('/createNote', (req, res) => {
    if (req.session.user != undefined) {
    let newNote = new note({
      title: req.body.title,
      content: req.body.content
    });
    newNote.save(() => {
      note.find().exec((err, result) => {
        if (err) next(err)
        res.json(result);
      })
    })
  }
  else {
    objectDataPage.title = 'Log in';
    objectDataPage.errors = 'Что бы создать заметку нужно авторизоваться.';
    res.render('pages/login', objectDataPage);
  }
  });
  // LOGIN Block
  app.get('/login', (req, res) => {
    res.render('pages/login', {title:"Log In", errors:[]});
    console.log(req.session.user);
  });

  app.post('/login', (req, res) => {
    const { login, password } = req.body;

    const validate = new Validator(
      { login, password },
      {
        login: 'required|min:3',
        password: 'required|min:6'
      }
    );
    validate.fails(function() {
      objectDataPage.title = 'Log In';
      objectDataPage.errors = 'Введите корректные данные.';
      res.render('pages/login', objectDataPage);
    });
    validate.passes( () => {
      user.findOne({login:login, password: password}, (err, user) => {
        if (err) next(err);
        if (user) {
          console.log(user._id);

          req.session.user = user._id;
          res.render('pages/create', objectDataPage);

          console.log(req.session.user);
        }
        else
        {
          objectDataPage.title = 'Log In';
          objectDataPage.errors = 'Данные введены неверно!';
          res.render('pages/login', objectDataPage);
        }
      });
    });
  });
// SIGNUP Block
  app.get('/signup', (req, res) => {
      res.render('pages/signup', {title:"Sign Up", errors:[]});
  });
  app.post('/signup', (req, res, next) => {
    const { login, password, password2 } = req.body;
    const validate = new Validator(
      { login, password, password2 },
      {
        login: 'required|min:3',
        password: 'required|min:6|same:password2',
        password2:'required|min:6'
      }
    );

    validate.fails(function(err) {
      objectDataPage.title = 'Sign Up';
      objectDataPage.errors = 'Введите корректные данные.';
      res.render('pages/signup', objectDataPage);
    });
    validate.passes(function() {
    // пошук по логіну в бд (count)
    user.find({login:login}).count(function(err, count) {
      if (err) next(err);
      if (count == 0) {
        let person = new user({
          login: login,
          password: password
        });
        person.save(err => {
          if (err) next(err);
        });
        res.send('Поздравляю! Пользователь зарегистрирован!');
      }
      else {
        objectDataPage.title = 'Sign Up';
        objectDataPage.errors = 'Такой логин уже зарегистрирован!';
        res.render('pages/signup', objectDataPage);
      }
    });
  });
  });
  app.use((err, req, res, next) => {
    res.sendStatus(404);
  })
};
