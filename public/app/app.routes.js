angular.module("devHousing").config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/components/home/homeView.html',
      controller: 'homeCtrl'
    });

    $urlRouterProvider.otherwise('/home');
});
