'use strict';
module.exports = function(app, db) {
  require('./note_routes')(app, db);
  // Тут, позже, будут и другие обработчики маршрутов
};
