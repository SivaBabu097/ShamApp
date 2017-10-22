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
        var jt = [1,2,3,4,5,6,7,8];
        app.row = [{jobType: 1, a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 2, a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 3, a1: 0, b1: 0, c1: 0, d1: 0},
                       {jobType: 4, a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 5, a1: 0, b1: 0, c1: 0, d1: 0},
                       {jobType: 6, a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 7, a1: 0, b1: 0, c1: 0, d1: 0},{jobType: 8, a1: 0, b1: 0, c1: 0, d1: 0}];
        for(i=0; i<app.hi.length; i++) {
          for(j=0; j<jt.length; j++) {
            if(app.hi[i].jobType == jt[j] && app.hi[i].referrer == 'one') {
              app.row[j].a1 = app.row[j].a1 + 1;
            }
            if(app.hi[i].jobType == jt[j] && app.hi[i].referrer == 'two') {
              app.row[j].b1 = app.row[j].b1 + 1;
            }
            if(app.hi[i].jobType == jt[j] && app.hi[i].referrer == 'three') {
              app.row[j].c1 = app.row[j].c1 + 1;
            }
            if(app.hi[i].jobType == jt[j] && app.hi[i].referrer == 'four') {
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
      }
    });
