angular.module('devHousing').controller('adminUsersController', function($scope, userSvc, user) {

$scope.user = user;

// display all users on view
$scope.displayUsers = function() {
    userSvc.getUsers().then(function(response) {
        $scope.users = response;
        for (var i = 0; i < $scope.users.length; i++) {
            var years = moment().diff($scope.users[i].birthdate, 'years');
            $scope.users[i].age = years;
        }
    });
};

$scope.displayUsers();

// create new user.  This functionality does not work yet, and may not be needed
// $scope.newUser = {};
// $scope.addUser = function(newUser) {
//     userSvc.createUser(newUser).then(function(response) {
//         $scope.displayUsers();
//         $scope.newUser = {};
//     });
// };


// update single user
$scope.updateUser = function(user) {
   var cohorts = [];
   cohorts.push(user.cohortID[0]);
    if(user.cohortID[1]) {
      cohorts.push(user.cohortID[1]);
    };
    if(user.cohortID[2]) {
      cohorts.push(user.cohortID[2]);
    };
    user.cohortID = cohorts;
  console.log("cohortId for both is: " + user.cohortID);
  // cohorts = cohorts.push(user.cohortId)

  // user.cohortID = [firstId, secondId];
  userSvc.update(user).then(function(response) {
    $scope.displayUsers();
  });
};

// delete single user
$scope.deleteUser = function(user) {
    userSvc.delete(user).then(function(response) {
        $scope.displayUsers();
    });
};

});  // closing tag
