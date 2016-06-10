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


    //show save button to edit cohorts
    $scope.editProvo = false;
    $scope.edit_Provo = function() {
        $scope.editProvo = !$scope.editProvo;
    };


    $scope.editSLC = false;
    $scope.edit_SLC = function() {
        $scope.editSLC = !$scope.editSLC;
    };


    $scope.editDallas = false;
    $scope.edit_Dallas = function() {
        $scope.editDallas = !$scope.editDallas;
    };

});
