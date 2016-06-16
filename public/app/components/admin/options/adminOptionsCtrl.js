angular.module('devHousing').controller('adminOptionsCtrl', function($scope, cohortSvc, user) {

    $scope.user = user;

    //get all cohorts on page load
    var callCohorts = function() {
        cohortSvc.getCohorts().then(function(response) {
            $scope.allCohorts = response;
        });
    };
    callCohorts();


    //save updated cohorts
    $scope.saveCohorts = function(cohorts){
      cohortSvc.saveCohorts(cohorts).then(function(response){
        //add saved indicator
    });
    };

});
