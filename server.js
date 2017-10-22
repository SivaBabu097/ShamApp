var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var bp = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var appRoutes = require('./backEnd/routes')(router);

mongoose.connect('mongodb://localhost:27017/Ssc', {useMongoClient: true}, function(err) {
  mongoose.Promise = global.Promise;
  if (err) {
    console.log('not ok...');
  } else {
    console.log('ok mari...');
  }
});

app.use(express.static(__dirname + '/public'));
app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
app.use('/', appRoutes);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port, function() {
  console.log('server running on port ' + port);
});
