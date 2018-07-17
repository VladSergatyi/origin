const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongoose_basics', function (err) {
   if (err) throw err;
});
var user = mongoose.model('user', {
  login: String,
  password: String});
var admin = new user({
  login: 'admin',
  password: '123456'
});
user.find().exec(function(err, books) {
        if (err) throw err;
        console.log(books);
    });
module.exports = admin;
module.exports = user;
