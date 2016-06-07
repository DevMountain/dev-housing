angular.module('devHousing')
  .controller('adminHomeCtrl', function ($scope, userSvc) {
    $scope.test = 'home works';

    let getPendingUsers = () => {
      userSvc.getPendingUsers().then( (response) => {
        $scope.pendingUsers = response.data;
      });
    }
    getPendingUsers();


//END of Controller
  });
