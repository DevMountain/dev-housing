angular.module('devHousing').controller('adminFutureHousingCtrl', function($scope, unitSvc, userSvc, user, cohortSvc){

  //Loads current users info
  $scope.user = user;

    //Loads all units and occupants from database
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

    //loads all users from database
      var loadUsers = function() {
          userSvc.getUsers().then(function(response) {
            parseUsers(response);
          });
      };
      loadUsers();

    //parses through all users and their properties. adds those that need housing to a new array.
      var parseUsers = function(users){
        $scope.allUsers = users;

        //change male/female to m/f
        for (var i = 0; i < $scope.allUsers.length; i++) {
            if ($scope.allUsers[i].gender === 'male') {
                $scope.allUsers[i].gender = 'M';
            } else if ($scope.allUsers[i].gender === 'female') {
                $scope.allUsers[i].gender = 'F';
            }
        }
        //calculate current age
        for (var i = 0; i < $scope.allUsers.length; i++) {
            var years = moment().diff($scope.allUsers[i].birthdate, 'years');
            $scope.allUsers[i].age = years;
        }

        //push users who need housing to new array
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



    // Adds a user to a unit's bedroom and reloads housing and users data.
      $scope.saveUnit = function(unit, user) {
          var occupant = {
            _id: user._id,
            inFutureHousing: true
          };
          var id = unit._id;
          unitSvc.addUserToUnitFuture(occupant, id).then(function(response) {
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
          inFutureHousing: false
        };
        var id = unit._id;
        unitSvc.removeUserFromUnitFuture(occupant, id).then(function(response) {
          loadHousing();
        });
        userSvc.update(occupant).then(function(response){
          loadUsers();
        });
      };


    //   var TempUnit = function(unit) {
    //     this.campus = unit.campus;
    //     this.propertyName = unit.propertyName;
    //     this.address = {
    //         street1: unit.address.street1,
    //         street2: unit.address.street2,
    //         city: unit.address.city,
    //         state: unit.address.state,
    //         zip: unit.address.zip
    //     };
    //     this.unitNumber = unit.unitNumber;
    //     for (var i = 0; i < unit.currentBedrooms.length; i++) {
    //         this.currentBedrooms.push(unit.currentBedrooms[i]);
    //     }
    //     // this.currentBedrooms = unit.currentBedrooms;
    //     this.futureBedrooms = unit.futureBedrooms;
    //     this.allCurrentOccupants = unit.allCurrentOccupants;
    //     this.allFutureOccupants = unit.allFutureOccupants;
    //     this.adminNotes = unit.adminNotes;
    // };

      $scope.setCurrentToFuture = function() {
        var tempUnits = [];
        var tempAllOccupants = [];
        var tempUsers = [];
        var inCurrentHousing = [];
        for (var i = 0; i < $scope.currentHousing.length; i++) {
            tempUnits.push($.extend(true, {}, $scope.currentHousing[i]));
        }
        for (var i = 0; i < tempUnits.length; i++) {
            tempUnits[i].allCurrentOccupants = tempUnits[i].allFutureOccupants;
            for (var j = 0; j < tempUnits[i].currentBedrooms.length; j++) {
                tempUnits[i].currentBedrooms[j].currentOccupants = tempUnits[i].futureBedrooms[j].futureOccupants;
                tempUnits[i].futureBedrooms[j].futureOccupants = [];
            }
            tempUnits[i].allFutureOccupants = [];
            if (tempUnits[i].allCurrentOccupants) {
                for (var k = 0; k < tempUnits[i].allCurrentOccupants.length; k++) {
                    tempAllOccupants.push(tempUnits[i].allCurrentOccupants[k]);
                }
            }
        }
        for (var i = 0; i < $scope.allUsers.length; i++) {
            $scope.allUsers[i].inFutureHousing = false;
            $scope.allUsers[i].inHousing = true;
        }
        for (var q = 0; q < tempAllOccupants.length; q++) {
            var tempUserObj = {
                id: tempAllOccupants[q],
                inFutureHousing: false,
                inHousing: true
            };
            tempUsers.push(tempUserObj);
        }
        for (var r = 0; r < allUsers.length; r++) {
            if ($scope.allUsers[r].inHousing) {
            inCurrentHousing.push($scope.allUsers[r]);
            }
        }

        var combinedObj = {
            units: tempUnits,
            users: tempUsers
        };



        unitSvc.setCurrentToFuture(combinedObj);


      };


});  // closing tag
