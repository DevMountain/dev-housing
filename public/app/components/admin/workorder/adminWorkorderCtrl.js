angular.module('devHousing')
  .controller('adminWorkorderCtrl', function ($scope, workorderSvc, user, unitSvc) {

    $scope.user = user;

    $scope.workorderRead = () => {
      workorderSvc.workorderRead().then( (response) => {
        $scope.adminList = response;
      });
  };

    setTimeout($scope.workorderRead(), 1000);

    // $scope.getAll = () => workorderSvc.workorderRead();
    $scope.adminWorkorder = {};
    $scope.workorderCreate = (obj) => {
    //   if($scope.workorderForm.$valid){  Figure out how to make validation work
        // $scope.workorderForm.$setPristine(); //not working, and probably unnecessary anyway
        //After workorder is created, only return most recent work order for student view.
        workorderSvc.workorderCreate(obj).then((response) => {
          $scope.workorderRead();
          $scope.adminWorkorder = {};
        });
    };

    $scope.workorderUpdate = (obj) => {
      workorderSvc.workorderUpdate(obj).then( (response) => {
        $scope.workorderRead();
      });
  };

    $scope.workorderDelete = (id) => {
      workorderSvc.workorderDelete(id).then( (response) => {
        $scope.workorderRead();
    });
  };

  // Putting unit info on the view
  $scope.displayUnits = function() {
      unitSvc.getUnits().then(function(response) {
          $scope.units = response;
      });
  };

  $scope.displayUnits();


// Workorder status selection function
$scope.selected = {};
$scope.selectStatus = function(status, id) {
    workorderSvc.workorderUpdate({_id: id, status: status}).then(function(response) {
        $scope.workorderRead();
    });
};


//End of Controller
  });
