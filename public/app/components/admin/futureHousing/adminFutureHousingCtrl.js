angular.module('devHousing').controller('adminFutureHousingCtrl', function($scope, unitSvc, userSvc, user, cohortSvc, $state){

  //LOADS CURRENT USER INFO.
  $scope.user = user;

    //LOADS ALL UNITS AND OCCUPANTS FROM DB.
      var loadHousing = function() {
        unitSvc.getUnits().then(function(response) {
            $scope.currentHousing = response;
        });
      };
      loadHousing();

    //LOAD ALL COHORT INFO.
    var loadCohorts = function() {
    $scope.allCohorts = [];
      cohortSvc.getCohorts().then(function(response){
        delete response._id;
        delete response.__v;
        for (var prop in response) {
          response[prop].name = prop;
          $scope.allCohorts.push(response[prop]);
        }
        //SETS DEFAULT CAMPUS VIEW TO ADMIN DEFAULT VIEW
        for (var i = 0; i < $scope.allCohorts.length; i++){
          if ($scope.user.adminDefaultView === $scope.allCohorts[i].name) {
            $scope.cohortFilter = $scope.allCohorts[i];
          }
        }
      });
    };
    loadCohorts();

      //LOADS ALL USERS FROM DATABASE.
      var loadUsers = function() {
          userSvc.getUsers().then(function(response) {
            parseUsers(response);
          });
      };
      loadUsers();

      //PARSES THROUGH ALL USERS AND THEIR PROPERTIES. ADDS THOSE THAT NEED HOUSING TO NEEDHOUSING ARRAY.
      var parseUsers = function(users){
        $scope.allUsers = users;

        //CHANGE MALE/FEMALE TO M/F
        for (var i = 0; i < $scope.allUsers.length; i++) {
            if ($scope.allUsers[i].gender === 'male') {
                $scope.allUsers[i].gender = 'M';
            } else if ($scope.allUsers[i].gender === 'female') {
                $scope.allUsers[i].gender = 'F';
            }
        }
        //CALCULATE CURRANT AGE IN YEARS.
        for (var i = 0; i < $scope.allUsers.length; i++) {
            var years = moment().diff($scope.allUsers[i].birthdate, 'years');
            $scope.allUsers[i].age = years;
        }
        //PUSH USERS WHO NEED HOUSING TO A NEW ARRAY.
        $scope.needHousing = [];
        for (var i = 0; i < $scope.allUsers.length; i++) {
            if (!$scope.allUsers[i].inFutureHousing) {
                $scope.needHousing.push($scope.allUsers[i]);
            }
        }
    };

      $scope.filterCurrentCohorts = function(person) {
        for (var i = 0; i < person.cohortID.length; i++) {
          for (var j = 0; j < $scope.allCohorts.length; j++){
            if(person.cohortID[i] === $scope.allCohorts[j].future || person.cohortID[i] === $scope.allCohorts[j].junior) {
              return true;
            }
          }
        }
        return false;
    };

    //ADDS A USER TO A UNIT'S BEDROOM AND RELOADS HOUSING AND USER'S DATA.
      $scope.saveUnit = function(unit, user) {
          var occupant = {
            _id: user._id,
            inFutureHousing: true
          };
          var id = unit._id;
          unitSvc.addUserToUnitFuture(occupant, id).then(function(response) {
            userSvc.update(occupant).then(function(response){
              loadHousing();
              loadUsers();
          });
        });
      };

    //REMOVES A USER FROM A UNIT AND RELOADS HOUSING AND USERS DATA.
      $scope.removeUser = function(unit, user) {
        var occupant = {
          _id: user._id,
          inFutureHousing: false
        };
        var id = unit._id;
        unitSvc.removeUserFromUnitFuture(occupant, id).then(function(response) {
          userSvc.update(occupant).then(function(response){
            loadHousing();
            loadUsers();
          });
        });
      };

      //SAVE CURRENT USER TO FUTURE HOUSING
      $scope.saveCurrentUsertoFuture = function(unit, user, index){
        user.inFutureHousing = true;
        var id = unit.futureBedrooms[index]._id;
        unitSvc.addUserToUnitFuture(user, id).then(function(response) {
          userSvc.update(user).then(function(response){
            loadHousing();
            loadUsers();
        });
      });
      }

      //CLEARS CURRENT HOUSING AND REPLACES IT WITH FUTURE, THEN CLEARS FUTURE.
      $scope.setCurrentToFuture = function(filter) { //TODO MAKE HER CONFIRM 5X THAT SHE WANTS TO UPDATE BEFORE RUNNING THE FUNCTION
        var currentCampusUsers = [];
        var tempUnits = [];
        var tempAllOccupants = [];
        var tempUsers = [];
        var inCurrentHousing = [];
        var currentCampusUnits = [];

        //ADDS USERS THAT MATCH CAMPUS FILTER AND ARE SENIORS OR JUNIORS TO NEW ARRAY AND SETS IN HOUSING PROPERTY TO FALSE.
        for (var i = 0; i < $scope.allUsers.length; i++) {
          if($scope.allUsers[i].campus === filter.name) {
            for (var j = 0; j < $scope.allUsers[i].cohortID.length; j++) {
              if ($scope.allUsers[i].cohortID[j] === filter.senior || $scope.allUsers[i].cohortID[j] === filter.junior) {
                $scope.allUsers[i].inHousing = false;
                delete $scope.allUsers[i].password,
                currentCampusUsers.push($scope.allUsers[i])
              }
            }
          }
        }

        //ADDS UNITS THAT MATCH CAMPUS FILTER TO NEW ARRAY THEN CLONES IT AND MAKES IT IMMUTABLE.
        for (var i = 0; i < $scope.currentHousing.length; i++) {
          if ($scope.currentHousing[i].campus === filter.name){
            tempUnits.push($.extend(true, {}, $scope.currentHousing[i]));
          }
        }
        //CLEAR OUT CURRENT HOUSING CLONE AND REPLACE IT WITH FUTURE HOUSING, THEN CLEAR OUT FUTURE HOUSING.
        for (var i = 0; i < tempUnits.length; i++) {
            tempUnits[i].allCurrentOccupants = tempUnits[i].allFutureOccupants;
            for (var j = 0; j < tempUnits[i].currentBedrooms.length; j++) {
                tempUnits[i].currentBedrooms[j].currentOccupants = tempUnits[i].futureBedrooms[j].futureOccupants;
                tempUnits[i].futureBedrooms[j].futureOccupants = [];
            }
            tempUnits[i].allFutureOccupants = [];

            //SETS ALL FUTURE OCCUPANTS TO NEW ARRAY
            if (tempUnits[i].allCurrentOccupants) {
                for (var k = 0; k < tempUnits[i].allCurrentOccupants.length; k++) {
                    tempAllOccupants.push(tempUnits[i].allCurrentOccupants[k]);
                }
            }
        }
        //CHANGES PROPERTIES ON ALL FUTURE OCCUPANTS USERS OBJECTS AND CREATES NEW ARRAY OF USER OBJECTS.
        for (var q = 0; q < tempAllOccupants.length; q++) {
            var tempUserObj = {
                _id: tempAllOccupants[q],
                inFutureHousing: false,
                inHousing: true
            };
            tempUsers.push(tempUserObj);
        }

        var combinedObj = {
            currentUsers: currentCampusUsers,
            units: tempUnits,
            futureUsers: tempUsers

        };
        unitSvc.setCurrentToFuture(combinedObj).then(function(response){
          alert('Success! Please update cohort IDs') //TODO make alert a modal instead of alert
          $state.go('admin-options')
          loadHousing();
          loadUsers();
        })
      };

});  // closing tag
