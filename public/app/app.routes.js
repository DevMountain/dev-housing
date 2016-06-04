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
      // controller: 'studentHomeCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data)
              $state.go('login');
            return response.data;
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('student-workorders', {
      url: '/student/workorders',
      templateUrl: './app/components/student/workorder/studentWorkorder.html',
      controller: 'studentWorkorderCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'student') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('student-rent', {
      url: '/student/rent',
      templateUrl: './app/components/student/rent/studentRent.html',
      // controller: 'studentCentCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'student') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('student-check-in', {
      url: '/student/check-in',
      templateUrl: './app/components/student/check-in/studentCheck-in.html',
      // controller: 'studentCheck-inCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'student') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('student-check-out', {
      url: '/student/check-out',
      templateUrl: './app/components/student/check-out/studentCheck-out.html',
      // controller: 'studentCheck-outCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'student') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('student-faq', {
        url: '/student/faq',
        templateUrl: './app/components/student/faq/studentFaq.html',
        controller: 'adminFaqController',
        resolve: {
          user: function(userSvc, $state) {
            return userSvc.getCurrentUser().then(function(response) {
              if (!response.data) {
                $state.go('login');
              } else if (response.data.role === 'student') {
                return response.data;
              }
                $state.go('login');
            }).catch(function(err) {
              $state.go('login');
            });
          }
        }
    })


    //ADMIN ROUTES ============================

    .state('admin-home', {
      url: '/admin/home',
      templateUrl: './app/components/admin/adminHome/adminHome.html',
      // controller: 'adminHomeCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('admin-workorders', {
      url: '/admin/workorders',
      templateUrl: './app/components/admin/workorder/workorder.html',
      controller: 'adminWorkorderCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('admin-currentHousing', {
      url: '/admin/currenthousing',
      templateUrl: './app/components/admin/currentHousing/currentHousing.html',
      controller: 'adminCurrentHousingCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('admin-futureHousing', {
      url: '/admin/futurehousing',
      templateUrl: './app/components/admin/futureHousing/futureHousing.html',
      controller: 'adminFutureHousingCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }

    })

    .state('admin-rent', {
      url: '/admin/rent',
      templateUrl: './app/components/admin/rent/rent.html',
      // controller: 'adminRentCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('admin-check-in', {
      url: '/admin/check-in',
      templateUrl: './app/components/admin/check-in/check-in.html',
      controller: 'adminCheck-inCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('admin-check-out', {
      url: '/admin/check-out',
      templateUrl: './app/components/admin/check-out/check-out.html',
      // controller: 'adminCheck-outCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('admin-housing-protocols', {
      url: '/admin/housing-protocols',
      templateUrl: './app/components/admin/housingProtocols/housingProtocols.html',
      // controller: 'adminHousingProtocolsCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('admin-faq', {
      url: '/admin/faq',
      templateUrl: './app/components/admin/faq/faq.html',
      controller: 'adminFaqController',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
    })

    .state('admin-options', {
      url: '/admin/options',
      templateUrl: './app/components/admin/options/options.html',
      controller: 'adminOptionsCtrl',
      resolve: {
        user: function(userSvc, $state) {
          return userSvc.getCurrentUser().then(function(response) {
            if (!response.data) {
              $state.go('login');
            } else if (response.data.role === 'admin') {
              return response.data;
            }
              $state.go('login');
          }).catch(function(err) {
            $state.go('login');
          });
        }
      }
  })

    .state('admin-users', {
        url: '/admin/users',
        templateUrl: './app/components/admin/users/users.html',
        controller: 'adminUsersController',
        resolve: {
          user: function(userSvc, $state) {
            return userSvc.getCurrentUser().then(function(response) {
              if (!response.data) {
                $state.go('login');
              } else if (response.data.role === 'admin') {
                return response.data;
              }
                $state.go('login');
            }).catch(function(err) {
              $state.go('login');
            });
          }
        }
    });

    $urlRouterProvider.otherwise('/login');

});
