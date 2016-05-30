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

    .state('workorder', {
      url: '/workorder',
      templateUrl: './app/components/workorder/workorderView.html',
      controller: 'workorderCtrl'
    })

    $urlRouterProvider.otherwise('/home'); //change back to '/login'

});
