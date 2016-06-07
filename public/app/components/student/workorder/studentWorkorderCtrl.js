angular.module('devHousing')
  .controller('studentWorkorderCtrl', function ($scope, workorderSvc, user) {

    $scope.user = user;

    $scope.workorderRead = () => {
      workorderSvc.workorderRead().then( (response) => {
        $scope.list = response;
      });
  };

    $scope.workorderRead();

    // $scope.getAll = () => workorderSvc.workorderRead();

    $scope.studentWorkorder = {};
    $scope.workorderCreate = (obj) => {
      // console.log('***Ctrl Create: ${JSON.stringify(obj)}');
    //   if($scope.workorderForm.$valid){
        // $scope.workorderForm.$setPristine(); //not working, and probably unnecessary anyway
        //After workorder is created, only return most recent work order for student view.
        workorderSvc.workorderCreate(obj).then((response) => {
          $scope.workorderRead();
          $scope.studentWorkorder = {};
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


//End of Controller
  });
