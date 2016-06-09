angular.module('devHousing')
  .controller('studentWorkorderCtrl', function ($scope, workorderSvc, user, unitSvc) {

    $scope.user = user;

    $scope.workorderRead = () => {
      workorderSvc.workorderRead().then( (response) => {
        $scope.list = response;
      });
  };

    $scope.workorderRead();

    // $scope.getAll = () => workorderSvc.workorderRead();

    $scope.adminWorkorder = {};
    $scope.workorderCreate = (obj) => {
      obj.submittedBy = user._id;
      obj.campus = user.campus;
    //   if($scope.workorderForm.$valid){
        // $scope.workorderForm.$setPristine(); //not working, and probably unnecessary anyway
        //After workorder is created, only return most recent work order for student view.
        workorderSvc.workorderCreate(obj).then((response) => {
          $scope.workorderRead();
        $scope.adminWorkorder = {};
        });
    //   }
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



  }); // closing tag
