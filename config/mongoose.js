const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
   if (err) throw err;
});

let user = mongoose.model('user', {
  login: String,
  password: String});
let admin = new user({
  login: 'admin',
  password: '123456'
});
let note = mongoose.model('note', {
  title: String,
  content: String
});

exports.note = note;
exports.user = user;

