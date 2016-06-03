angular.module('devHousing').controller('adminCurrentHousingCtrl', function($scope, unitSvc, userSvc){

var loadHousing = function() {
  unitSvc.getUnits().then(function(response){
    $scope.currentHousing = response;
  });
};

loadHousing();

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


});
