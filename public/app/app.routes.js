angular.module("devHousing").config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: './app/components/login/loginView.html',
      controller: 'loginCtrl'
    })

    .state('home', {
      url: '/home',
      templateUrl: './app/components/home/homeView.html',
      controller: 'homeCtrl'
    })

    .state('workorders', {
      url: '/workorders',
      templateUrl: './app/components/workorders/workordersView.html',
      controller: 'workordersCtrl'
    })

    $urlRouterProvider.otherwise('/login');

});
