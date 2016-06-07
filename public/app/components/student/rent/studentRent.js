angular.module('devHousing').controller('studentRentCtrl', function($scope, userSvc) {

    // Display user info on view
    $scope.displayUsers = function() {
        userSvc.getUsers().then(function(response) {
            $scope.users = response;
        });
    };

    $scope.displayUsers();


});  // closing tag
