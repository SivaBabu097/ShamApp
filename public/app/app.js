var app = angular.module('mym', ['ngRoute']);
    app.config(function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html'
        })
        .when('/dashboard1', {
          templateUrl: 'views/dashboard.html'
        })
        .when('/dashboard2', {
          templateUrl: 'views/dashboard2.html'
        })
        .when('/contact', {
          templateUrl: 'views/contact.html'
        })
        .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode({
           enabled : true,
           requireBase : false
         });
    });
    app.controller('myc', function($http, $location) {
      var app = this;
      var refresh = function() {
      $http.get('/dash').then(function(data) {
        app.hi = data.data;
        console.log(app.hi);
        var jt = ['job1','job2','job3','job4','job5','job6','job7','job8',];
        app.row = [{jobType: 'job1', a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 'job2', a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 'job3', a1: 0, b1: 0, c1: 0, d1: 0},
                       {jobType: 'job4', a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 'job5', a1: 0, b1: 0, c1: 0, d1: 0},
                       {jobType: 'job6', a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 'job7', a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 'job8', a1: 0, b1: 0, c1: 0, d1: 0}];
        for(i=0; i<app.hi.length; i++) {
          for(j=0; j<jt.length; j++) {
            if(app.hi[i].jobType == jt[j] && app.hi[i].referrer == 'SatyaNarayana') {
              app.row[j].a1 = app.row[j].a1 + 1;
            }
            if(app.hi[i].jobType == jt[j] && app.hi[i].referrer == 'Venkat') {
              app.row[j].b1 = app.row[j].b1 + 1;
            }
            if(app.hi[i].jobType == jt[j] && app.hi[i].referrer == 'Jyothi') {
              app.row[j].c1 = app.row[j].c1 + 1;
            }
            if(app.hi[i].jobType == jt[j] && app.hi[i].referrer == 'Bhavani') {
              app.row[j].d1 = app.row[j].d1 + 1;
            }
          }
        }
      });
      };
      refresh();
      this.dash = function(s) {
        console.log(this.s);
        $http.post('/users', this.s).then(function(data) {
          app.s.name = '';
          app.s.place = '';
          app.s.quali = '';
          console.log(data.data);
          $location.path('/dashboard1');
          refresh();
        });
      };

      this.remove = function(id) {
        console.log('test remove..' + id);
        $http.delete('/users/' + id).then(function(data) {
          refresh();
        });
      };

      this.edit = function(id) {
        console.log('testing edit..' + id);
        $http.get('/users/' + id).then(function(data) {
          app.modelData = data.data;
          console.log(app.modelData);
          app.md = app.modelData;
      //    console.log(app.md);
        });
      };

      this.update = function() {
        console.log(app.md._id);
        var id = app.md._id;
        $http.put('/users/' + id, app.md).then(function(data) {
          refresh();
          console.log(data.data);
        });
      };
    });
