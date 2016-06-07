angular.module('devHousing')
  .controller('adminHomeCtrl', function ($scope, userSvc, workorderSvc) {
    $scope.test = 'home works';

    let getPendingUsers = () => {
      userSvc.getPendingUsers().then( (response) => {
        console.log(`either page loaded, or clearing the list.....`);
        $scope.pendingUsers = response.data;
      });
    }
    getPendingUsers();

    let getPendingWO = () => {
      workorderSvc.getPendingWO().then( (response) => {
        $scope.pendingWO = response.data;
      })
    }
    getPendingWO();

    $scope.setCohortId = (userId, cohortId) => {
      console.log(`I'm in your controller, killing your doodz: ${userId}, ${cohortId}`);
      userSvc.setCohortId(userId, cohortId).then( (response) => {
        console.log(`We got the RESPONSE back!  ...in the controller`);
        getPendingUsers();
      })
    }


//END of Controller
  });
