angular.module('devHousing').controller('adminCurrentHousingCtrl', function($scope, unitSvc, user, userSvc, cohortSvc) {

  //Loads current users info
  $scope.user = user;

  // Loads all units and occupants from database.
    var loadHousing = function() {
        unitSvc.getUnits().then(function(response) {
            $scope.currentHousing = response;
        });
    };

    loadHousing();

    //Load all cohort info
    var loadCohorts = function() {
        $scope.allCohorts = [];
      cohortSvc.getCohorts().then(function(response){
        delete response._id;
        delete response.__v;
        for (var prop in response) {
          response[prop].name = prop;
          $scope.allCohorts.push(response[prop]);
        }
    });
};
    loadCohorts();

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
      // Calculate current age.
      for (var i = 0; i < $scope.allUsers.length; i++) {
        var years = moment().diff($scope.allUsers[i].birthdate, 'years');
        $scope.allUsers[i].age = years;
      }
      // Push users who need housing to new array.
      for (var i = 0; i < $scope.allUsers.length; i++) {
          if (!$scope.allUsers[i].inHousing) {
              $scope.needHousing.push($scope.allUsers[i]);
          }
      }
  };

    $scope.filterFutureCohorts = function(person) {
      for (var i = 0; i < person.cohortID.length; i++) {
        for (var j = 0; j < $scope.allCohorts.length; j++){
          if(person.cohortID[i] === $scope.allCohorts[j].senior || person.cohortID[i] === $scope.allCohorts[j].junior) {
            return true;
          }
        }
      }
      return false;
  };




  // Adds a user to a unit's bedroom and reloads housing and users data.
    $scope.saveUnit = function(unit, user) {
      console.log(user);
      console.log(user.campus);
        var occupant = {
          _id: user._id,
          inHousing: true
        };
        var id = unit._id;
        unitSvc.addUserToUnitCurrent(occupant, id).then(function(response) {
            loadHousing();
        });
        userSvc.update(occupant).then(function(response){
          loadUsers();
      });

  };

  
  // Removes a user from a unit and reloads housing and users data.
    $scope.removeUser = function(unit, user) {
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
