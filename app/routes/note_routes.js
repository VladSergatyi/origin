module.exports = function(app, db) {
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  app.post('/login', (req, res) => {

    db.collection('users').find().toArray((err, resul) => {
      if (err) {return console.log(err);}
      console.log(resul[0].login);
      if (req.body.login == resul[0].login){
        res.send('Вы прошли авторизацию');
      }
      else {
        res.sendFile('./../../public/index.html');
      }
    })
  });
  app.get('/', (req, res) => {
    res.sendFile('index.html');
  })
};
