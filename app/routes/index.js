const noteRoutes = require('./note_routes');
module.exports = function(app, db, validator, user) {
  noteRoutes(app, db, validator, user);
  // Тут, позже, будут и другие обработчики маршрутов
};
