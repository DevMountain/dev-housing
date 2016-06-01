angular.module('devHousing').controller('currentHousingCtrl', function($scope, unitSvc){

var loadHousing = function() {
  console.log('loading housing');
  unitSvc.getUnits().then(function(response){
    console.log(response);
    $scope.currentHousing = response
  })
}

loadHousing();

})
