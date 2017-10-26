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

  router.delete('/users/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    User.findByIdAndRemove({_id: req.params.id}).exec(function(err, xx) {
      if (err) throw err;
      if(!xx) {
        res.send('no id');
      }
      if (xx) {
      res.send('deleted');
      }
    });
  });

  router.get('/users/:id', function(req, res) {
    var id = req.params.id;
    console.log(id);
    User.findById({_id: id}).exec(function(err, dd) {
      res.send(dd);
    });
  });

 /* router.put('/users/:id', function(req,res) {
    var id = req.params.id;
    var user = new User();
    console.log(id);
    User.findById({_id: id}).exec(function(err, db) {
      if (err) throw err;
      else {
        user.update({_id: id}, {$set: {
        db.name = req.body.name;
        db.place = req.body.place;
        db.qualification = req.body.qualification;
        db.jobType = req.body.jobType;
        db.referrer = req.body.referrer;
      }
    }).exec(function(err, dt) {
      res.send('updated..');
    });
      }
    });
  });
*/

  /*
  router.put('/users/:id', function(req,res) {
    var id = req.params.id;
    var user = new User();
    console.log(id);
    User.update({_id: id}, {$set: {
      user.name = req.body.name;
      user.place = req.body.place;
      user.qualification = req.body.qualification;
      user.jobType = req.body.jobType;
      user.referrer = req.body.referrer;
    }
    }).exec(function(err, db) {
      if (err) throw err;
      res.send('updated...');
    });
  });
  */

  return router;
}
