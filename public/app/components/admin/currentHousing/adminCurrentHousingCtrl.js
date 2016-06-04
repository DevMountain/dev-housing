angular.module('devHousing').controller('adminCurrentHousingCtrl', function($scope, unitSvc, userSvc) {

    var loadHousing = function() {
        unitSvc.getUnits().then(function(response) {
            $scope.currentHousing = response;
        });
    };

    loadHousing();

    var loadUsers = function() {
        userSvc.getUsers().then(function(response) {
          parseUsers(response);
        });
    };
    loadUsers();


    $scope.saveUnit = function(unit, user) {
        var occupant = {
          _id: user._id,
          inHousing: true
        };
        var id = unit._id;
        unitSvc.addUserToUnit(occupant, id).then(function(response) {
            loadHousing();
        })
        userSvc.update(occupant).then(function(response){
          loadUsers();
        })

    }

    $scope.removeUser = function(unit, user) {
      console.log('FUCK MY NAUGHTY ASS');
      console.log(unit);
      console.log(user);
      var occupant = {
        _id: user._id,
        inHousing: false
      };
      var id = unit._id;
      unitSvc.removeUserFromUnit(occupant, id).then(function(response) {
        loadHousing();
      });
      userSvc.update(occupant).then(function(response){
        loadUsers();
      });
    };

    var parseUsers = function(users){
      $scope.allUsers = users;
      $scope.needHousing = [];
      //change male/female to m/f
      for (var i = 0; i < $scope.allUsers.length; i++) {
          if ($scope.allUsers[i].gender === 'male') {
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
    }

});
