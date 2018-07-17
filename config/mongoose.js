const mongoose = require('mongoose');
// TODO:: переписати під process.env
mongoose.connect(
  'mongodb://localhost/mongoose_basics',
  function(err) {
    console.log("can't connect to db, err:" + err.message);
    process.exit(1);
  }
);
var user = mongoose.model('user', {
  login: String,
  password: String
});
// // забрати всі var -> let, const
// var admin = new user({
//   login: 'admin',
//   password: '123456'
// });
// user.find().exec(function(err, books) {
//   if (err) throw err;
//   console.log(books);
// });

module.exports = { user };
