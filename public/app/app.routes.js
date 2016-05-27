angular.module("devHousing").config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


    .state('home', {
      url: '/home',
      templateUrl: '/components/home/homeView.html',
      controller: 'homeCtrl'
    })

    .state('work-orders', {
      url: '/work-orders',
      templateUrl: '/components/home/work-ordersView.html',
      controller: 'workOrdersCtrl'
    })

    $urlRouterProvider.otherwise('/home');

});
