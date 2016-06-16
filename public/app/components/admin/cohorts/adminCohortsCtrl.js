angular.module('devHousing').controller('adminCohortsCtrl', function($scope, cohortSvc, user) {

    $scope.user = user;

    //get all cohorts on page load
    var callCohorts = function() {
        cohortSvc.getCohorts().then(function(response) {
          $scope.provoSenior = angular.copy(response.Provo.senior);
          $scope.provoJunior = angular.copy(response.Provo.junior);
          $scope.provoFuture = angular.copy(response.Provo.future);
          $scope.slcSenior = angular.copy(response.SLC.senior);
          $scope.slcJunior = angular.copy(response.SLC.junior);
          $scope.slcFuture = angular.copy(response.SLC.future);
          $scope.dallasSenior = angular.copy(response.Dallas.senior);
          $scope.dallasJunior = angular.copy(response.Dallas.junior);
          $scope.dallasFuture = angular.copy(response.Dallas.future);
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
