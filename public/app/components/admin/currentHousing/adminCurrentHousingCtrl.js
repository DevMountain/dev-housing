angular.module('devHousing').controller('adminCurrentHousingCtrl', function($scope, unitSvc, userSvc){

var loadHousing = function() {
  console.log('loading housing');
  unitSvc.getUnits().then(function(response){
    $scope.currentHousing = response;
  })
};

loadHousing();

// var loadUsers = function() {
//   console.log('loding users');
//   userSvc.getUsers().then(function(response){
//     $scope.allUsers = response;
//   })
// };
//
// loadUsers();


})
