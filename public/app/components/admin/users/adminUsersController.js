angular.module('devHousing').controller('adminUsersController', function($scope, userSvc) {

// display all users on view
$scope.displayUsers = function() {
    userSvc.getUsers().then(function(response) {
        $scope.users = response;
    });
};

$scope.displayUsers();


// update single user
$scope.updateUser = function(user) {
    console.log(user);
    userSvc.updateUser(user).then(function(response) {
        $scope.displayUsers();
    });
};

});  // closing tag
