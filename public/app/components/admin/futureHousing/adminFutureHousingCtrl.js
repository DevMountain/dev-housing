angular.module('devHousing').controller('adminFutureHousingCtrl', function($scope, unitSvc, userSvc){

    // Populate with all housing data
    var loadHousing = function() {
      unitSvc.getUnits().then(function(response){
        $scope.currentHousing = response;
      });
    };

    loadHousing();

    // Populate with specific user data.  Need to change parameters for future
    var loadUsers = function() {
      userSvc.getUsers().then(function(response){
        $scope.allUsers = response;
        $scope.needHousing = [];
        //change male/female to m/f
        for (var i = 0; i < $scope.allUsers.length; i++) {
          if ($scope.allUsers[i].gender === 'male'){
            $scope.allUsers[i].gender = 'M';
          } else if ($scope.allUsers[i].gender === 'female') {
            $scope.allUsers[i].gender = 'F';
          }
        }
        //push users who need housing to new array
        for (var i = 0; i < $scope.allUsers.length; i++) {
          if (!$scope.allUsers[i].inHousing) {
            $scope.needHousing.push($scope.allUsers[i]);
          }
        }
        //calculate current age
        for (var i = 0; i < $scope.allUsers.length; i++) {
          var years = moment().diff($scope.allUsers[i].birthdate, 'years');
          $scope.allUsers[i].age = years;
        }
    });
    };

    loadUsers();

});  // closing tag
