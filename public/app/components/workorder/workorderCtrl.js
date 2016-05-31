angular.module('devHousing')
  .controller('workorderCtrl', function ($scope, workorderSvc) {

    $scope.workorderCreate = (obj) => {
      if($scope.workorderForm.$valid){
        console.log('hitting the CTRL Create method: ' + obj.description);
        // $scope.workorderForm.$setPristine(); //not working, and probably unnecessary anyway
        workorderSvc.workorderCreate(obj).then((response) => {
          console.log(response);
          $scope.workorderRead();
        });
      }
    };

    $scope.workorderRead = () => {
      console.log('hitting the CTRL Read or GET all method');
      workorderSvc.workorderRead().then( (response) => {
        console.log('AFTER Promise: ' + response);
        $scope.list = response;
      });
    }


//End of Controller
  });
