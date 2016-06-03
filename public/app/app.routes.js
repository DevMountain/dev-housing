angular.module("devHousing").config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: './app/components/login/loginView.html',
      controller: 'loginCtrl'
    })

    //STUDENT ROUTES ============================

    .state('student-home', {
      url: '/student/home',
      templateUrl: './app/components/student/home/studentHome.html',
      // controller: 'studentHomeCtrl'
    })

    .state('student-workorders', {
      url: '/student/workorders',
      templateUrl: './app/components/student/workorder/studentWorkorder.html',
      controller: 'studentWorkorderCtrl'
    })

    .state('student-rent', {
      url: '/student/rent',
      templateUrl: './app/components/student/rent/studentRent.html',
      // controller: 'studentCentCtrl'
    })

    .state('student-check-in', {
      url: '/student/check-in',
      templateUrl: './app/components/student/check-in/studentCheck-in.html',
      controller: 'studentCheck-inCtrl'
    })

    .state('student-check-out', {
      url: '/student/check-out',
      templateUrl: './app/components/student/check-out/studentCheck-out.html',
      // controller: 'studentCheck-outCtrl'
    })

    .state('student-faq', {
        url: '/student/faq',
        templateUrl: './app/components/student/faq/studentFaq.html',
        controller: 'studentFaqCtrl'
    })


    //ADMIN ROUTES ============================

    .state('admin-home', {
      url: '/admin/home',
      templateUrl: './app/components/admin/adminHome/adminHome.html',
      // controller: 'adminHomeCtrl'
    })

    .state('admin-workorders', {
      url: '/admin/workorders',
      templateUrl: './app/components/admin/workorder/workorder.html',
      controller: 'adminWorkorderCtrl'
    })

    .state('admin-currentHousing', {
      url: '/admin/currenthousing',
      templateUrl: './app/components/admin/currentHousing/currentHousing.html',
      controller: 'adminCurrentHousingCtrl'
    })

    .state('admin-futureHousing', {
      url: '/admin/futurehousing',
      templateUrl: './app/components/admin/futureHousing/futureHousing.html',
      controller: 'adminFutureHousingCtrl'

    })

    .state('admin-rent', {
      url: '/admin/rent',
      templateUrl: './app/components/admin/rent/rent.html',
      // controller: 'adminRentCtrl'
    })

    .state('admin-check-in', {
      url: '/admin/checkin',
      templateUrl: './app/components/admin/check-in/checkin.html',
      controller: 'adminCheckinCtrl'
    })

    .state('admin-check-out', {
      url: '/admin/checkout',
      templateUrl: './app/components/admin/check-out/checkout.html',
      controller: 'adminCheckoutCtrl'
    })

    .state('admin-housing-protocols', {
      url: '/admin/housing-protocols',
      templateUrl: './app/components/admin/housingProtocols/housingProtocols.html',
      // controller: 'adminHousingProtocolsCtrl'
    })

    .state('admin-faq', {
      url: '/admin/faq',
      templateUrl: './app/components/admin/faq/faq.html',
      controller: 'adminFaqController'
    })

    .state('admin-options', {
      url: '/admin/options',
      templateUrl: './app/components/admin/options/options.html',
      controller: 'adminOptionsCtrl'
  })

    .state('admin-users', {
        url: '/admin/users',
        templateUrl: './app/components/admin/users/users.html',
        controller: 'adminUsersController'
    });

    $urlRouterProvider.otherwise('/login');

});
