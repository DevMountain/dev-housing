angular.module('devHousing').controller('adminUsersController', function($scope, userSvc, user, cohortSvc) {

$scope.user = user;

// DISPLAY ALL USERS ON VIEW, CONVERT AGE TO YEARS, AND CONVERT RENT DATE TO READABLE FORMAT
$scope.displayUsers = function() {
    userSvc.getUsers().then(function(response) {
        $scope.users = response;
        for (var i = 0; i < $scope.users.length; i++) {
            var rentPaidConverted = [];
            var years = moment().diff($scope.users[i].birthdate, 'years');
            $scope.users[i].age = years;
            if ($scope.users[i].deposit.depositPaid) {
              var depositPaidDateConverted = moment($scope.users[i].deposit.depositPaidDate).format('M/D/YY');
              $scope.users[i].deposit.depositPaidDateConverted = depositPaidDateConverted;
            }
            if ($scope.users[i].deposit.depositReturned) {
              var depositReturnedDateConverted = moment($scope.users[i].deposit.depositReturnedDate).format('M/D/YY');
              $scope.users[i].deposit.depositReturnedDateConverted = depositReturnedDateConverted;
            }
              for (var j = 0; j < $scope.users[i].rent.rentPaid.length; j++){
                var rentDate = moment($scope.users[i].rent.rentPaid[j]).format('M/D/YY');
                rentPaidConverted.push(rentDate);
              }
            $scope.users[i].rent.rentPaidConverted = rentPaidConverted;
        }
    });
};

$scope.displayUsers();

// update single user
$scope.updateUser = function(user) {
    // this is to update multiple cohorts to an array
    var cohorts = [];
    cohorts.push(user.cohortID[0].toUpperCase().trim());
    if (user.cohortID[1]) {
        cohorts.push(user.cohortID[1].toUpperCase().trim());
    }
    if (user.cohortID[2]) {
        cohorts.push(user.cohortID[2].toUpperCase().trim());
    }
    user.cohortID = cohorts;
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
    //SETS DEFAULT CAMPUS VIEW TO ADMIN DEFAULT VIEW
    for (var i = 0; i < $scope.allCohorts.length; i++){
      if ($scope.user.adminDefaultView === $scope.allCohorts[i].name) {
        $scope.cohortFilter = $scope.allCohorts[i];
      }
    }
  });
};
loadCohorts();




});  // closing tag
