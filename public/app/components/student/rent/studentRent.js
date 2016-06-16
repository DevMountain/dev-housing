angular.module('devHousing').controller('studentRentCtrl', function($scope, userSvc, user) {

    // User info
    $scope.user = user;

    var rentPaid = function() {
      var rentPaidConverted = [];
      for (var j = 0; j < $scope.user.rent.rentPaid.length; j++){
        var rentDate = moment($scope.user.rent.rentPaid[j]).format('M/D/YY');
        rentPaidConverted.push(rentDate);
      }
    $scope.user.rent.rentPaidConverted = rentPaidConverted;
}

  rentPaid();

});  // closing tag
