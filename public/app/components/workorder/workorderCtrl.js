angular.module('devHousing')
  .controller('workorderCtrl', function ($scope, workorderSvc) {

    $scope.workorderCreate = (obj) => {
      console.log(obj);
      workorderSvc.workorderCreate();
    }


//End of Controller
  });
