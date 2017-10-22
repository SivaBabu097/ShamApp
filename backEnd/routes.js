var User = require('./model');

module.exports = function(router) {

  router.get('/dash', function(req, res) {
    User.find({}).exec(function(err, db) {
      if(err) throw err;
      if(!db) {
        res.send('no data..');
      }
      if(db) {
        res.send(db);
      }
    });
  });

  router.post('/users', function(req, res) {
    console.log(req.body);
    var user = new User();
    user.name = req.body.name;
    user.place = req.body.place;
    user.qualification = req.body.quali;
    user.jobType = req.body.jtype;
    user.referrer = req.body.rtype;
    user.save(function(err) {
      if (err) throw err;
      res.send('ok saved..');
    });
  });

  return router;
}
