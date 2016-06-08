angular.module('devHousing')
  .controller('adminWorkorderCtrl', function ($scope, workorderSvc, user) {

    $scope.user = user;

    $scope.workorderRead = () => {
      workorderSvc.workorderRead().then( (response) => {
        $scope.adminList = response;
          console.log(response.status);
          // if (response.status === 'Received') {
          //   $('#WO_Received').css({"text-decoration":"underline";"text-decoration-color":"yellow"});
          // };
      });
  };

    setTimeout($scope.workorderRead(), 1000);

    // $scope.getAll = () => workorderSvc.workorderRead();
    $scope.adminWorkorder = {};
    $scope.workorderCreate = (obj) => {
        console.log(`***Ctrl Create: ${JSON.stringify(obj)}`);
    //   if($scope.workorderForm.$valid){  Figure out how to make validation work
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


//End of Controller
  });
