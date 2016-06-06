angular.module('devHousing')
  .controller('adminHomeCtrl', function ($scope, userSvc) {
    $scope.test = 'home works';

    $scope.getPendingUsers = () => {
      console.log(`CTRL getting the penders`);
      userSvc.getPendingUsers().then( (response) => {
        console.log(`CTRL got the RESPONSE back! ${JSON.stringify(response)}`);
        $scope.pendingUsers = response;
      });
    }


//END of Controller
  });
