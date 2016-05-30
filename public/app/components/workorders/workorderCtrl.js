angular.module('devHousing')
  .controller('workorderCtrl', function ($scope, workorderSvc) {

    // $scope.workorderCreate = (obj) => {
    //   workorderSvc.workorderCreate(obj).then();
    // };

    $scope.workorderCreate = function (obj) {
      workorderSvc.workorderCreate(obj).then();
    }


//End of Controller
  });
