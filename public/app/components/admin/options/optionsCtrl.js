angular.module('devHousing').controller('optionsCtrl', function($scope, cohortSvc) {

    var callCohorts = function() {
        cohortSvc.getCohorts().then(function(response) {
            $scope.allCohorts = response.data
        })
    }
    callCohorts();

})
