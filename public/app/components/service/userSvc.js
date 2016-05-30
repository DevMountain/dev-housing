angular.module('devHousing').service('userSvc', function($http){

this.createUser = function(user) {
  return $http({
    method: 'POST',
    url: '/users'
  }).then(function(response){
    
  })
};





})
