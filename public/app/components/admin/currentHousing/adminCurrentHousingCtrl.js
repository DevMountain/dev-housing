angular.module('devHousing').controller('adminCurrentHousingCtrl', function($scope, unitSvc, userSvc) {

  // Loads all units and occupants from database.
    var loadHousing = function() {
        unitSvc.getUnits().then(function(response) {
            $scope.currentHousing = response;
        });
    };

    loadHousing();

  // Loads all users from database.
    var loadUsers = function() {
        userSvc.getUsers().then(function(response) {
          parseUsers(response);
        });
    };
    loadUsers();

  // Parses through all users and their properties. Adds those that need housing to a new array.
    var parseUsers = function(users){
      $scope.allUsers = users;
      $scope.needHousing = [];
      // Change male/female to M/F.
      for (var i = 0; i < $scope.allUsers.length; i++) {
          if ($scope.allUsers[i].gender === 'male') {
              $scope.allUsers[i].gender = 'M';
          } else if ($scope.allUsers[i].gender === 'female') {
              $scope.allUsers[i].gender = 'F';
          }
      }
      // Push users who need housing to new array.
      for (var i = 0; i < $scope.allUsers.length; i++) {
          if (!$scope.allUsers[i].inHousing) {
              $scope.needHousing.push($scope.allUsers[i]);
          }
      }
      // Calculate current age.
      for (var i = 0; i < $scope.allUsers.length; i++) {
          var years = moment().diff($scope.allUsers[i].birthdate, 'years');
          $scope.allUsers[i].age = years;
      }
    }

  // Adds a user to a unit's bedroom and reloads housing and users data.
    $scope.saveUnit = function(unit, user) {
        var occupant = {
          _id: user._id,
          inHousing: true
        };
        var id = unit._id;
        unitSvc.addUserToUnitCurrent(occupant, id).then(function(response) {
            loadHousing();
        })
        userSvc.update(occupant).then(function(response){
          loadUsers();
        })

    }
  // Removes a user from a unit and reloads housing and users data.
    $scope.removeUser = function(unit, user) {
      console.log(unit);
      console.log(user);
      var occupant = {
        _id: user._id,
        inHousing: false
      };
      var id = unit._id;
      unitSvc.removeUserFromUnitCurrent(occupant, id).then(function(response) {
        loadHousing();
      });
      userSvc.update(occupant).then(function(response){
        loadUsers();
      });
    };



});
