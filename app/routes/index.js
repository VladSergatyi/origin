const noteRoutes = require('./note_routes');
module.exports = function(app, db, validator, user) {
  noteRoutes(app, db, validator, user);
};
