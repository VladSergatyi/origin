'use strict';
module.exports = app => {
  require('./note_routes')(app);

  //TODO на домашку - ерор хендлінг
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
};
