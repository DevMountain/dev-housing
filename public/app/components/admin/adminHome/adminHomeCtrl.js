angular.module('devHousing')
  .controller('adminHomeCtrl', function ($scope, userSvc, workorderSvc, user) {
    $scope.user = user;

    let getPendingUsers = () => {
      userSvc.getPendingUsers().then( (response) => {
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

    $scope.setCohortId = (userId, cohortID) => {
      let obj = {};
      obj._id = userId;
      obj.cohortID = cohortID.toUpperCase().trim();
      userSvc.setCohortId(obj).then( (response) => {
        getPendingUsers();
      })
    }

    $scope.setWOStatus = (wo_id, status) => {
      let obj = {};
      obj._id = wo_id;
      obj.status = status;

      workorderSvc.setWOStatus(obj).then( (response) => {
        getPendingWO();
      })
    }


//END of Controller
  });
