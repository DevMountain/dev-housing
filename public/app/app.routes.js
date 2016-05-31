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

    //ADMIN ROUTES ============================

    .state('admin-workorders', {
      url: '/admin/workorders',
      templateUrl: './app/components/admin/workorder/workorder.html',
      // controller: 'workorderCtrl' //conflicts with other workorder stuff???
    })

    .state('admin-currentHousing', {
      url: '/admin/currenthousing',
      templateUrl: './app/components/admin/currentHousing/currentHousing.html',
      // controller: 'currentHousingCtrl'
    })

    .state('admin-futureHousing', {
      url: '/admin/futurehousing',
      templateUrl: './app/components/admin/futureHousing/futureHousing.html',
      // controller: 'futureHousingCtrl'
    })

    .state('admin-rent', {
      url: '/admin/rent',
      templateUrl: './app/components/admin/rent/rent.html',
      // controller: 'rentCtrl'
    })

    .state('admin-addEditUser', {
      url: '/admin/addedituser',
      templateUrl: './app/components/admin/addEditUser/addEditUser.html',
      // controller: 'addEditUserCtrl'
    })

    .state('admin-options', {
      url: '/admin/options',
      templateUrl: './app/components/admin/options/options.html',
      // controller: 'optionsCtrl'
    })

    .state('admin-check-in', {
      url: '/admin/check-in',
      templateUrl: './app/components/admin/check-in/check-in.html',
      // controller: 'check-inCtrl'
    })

    .state('admin-check-out', {
      url: '/admin/check-out',
      templateUrl: './app/components/admin/check-out/check-out.html',
      // controller: 'check-outCtrl'
    })

    .state('admin-home', {
      url: '/admin/home',
      templateUrl: './app/components/admin/adminHome/adminHome.html',
      // controller: 'adminHomeCtrl'
    })


    $urlRouterProvider.otherwise('/login');

});
