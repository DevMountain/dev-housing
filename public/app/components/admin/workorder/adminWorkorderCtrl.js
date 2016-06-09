angular.module('devHousing')
  .controller('adminWorkorderCtrl', function ($scope, workorderSvc, user, unitSvc) {

    $scope.user = user;

    $scope.workorderRead = () => {
      workorderSvc.workorderRead().then( (response) => {
          for (let i = 0; i < response.length; i++) {
              response[i].dateSubmitted = moment(response[i].dateSubmitted).format('dddd MMMM Do YYYY - h:mm A');
          }
        $scope.adminList = response;
      });
  };

   $scope.workorderRead();

    $scope.adminWorkorder = {};
    $scope.workorderCreate = (obj) => {
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
