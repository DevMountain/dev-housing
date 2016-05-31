angular.module('devHousing')
  .controller('workorderCtrl', function ($scope, workorderSvc) {

    $scope.workorderCreate = (obj) => {
      console.log(obj);
      workorderSvc.workorderCreate(obj).then($scope.workorderRead());
    };

    $scope.workorderRead = () => {
      workorderSvc.workorderRead().then( (response) => {
        $scope.list = response.data;
      });
    }


//End of Controller
  });
