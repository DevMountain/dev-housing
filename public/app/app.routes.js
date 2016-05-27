angular.module("devHousing").config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    $urlRouterProvider.otherwise('/home');

    .state('home', {
      url: '/home',
      templateUrl: '/components/home/homeView.html',
      controller: 'homeCtrl'
    })

    .state('work-orders', {
      url: '/work-orders',
      templateUrl: '/components/home/work-ordersView.html',
      controller: 'homeCtrl'
    })

});
