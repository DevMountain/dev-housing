angular.module('devHousing').service('userSvc', function($http){

this.createUser = function(user) {
  return $http({
    method: 'POST',
    url: '/user',
    data: user
  }).then(function(response){
    console.log(response);
  })
};





})
