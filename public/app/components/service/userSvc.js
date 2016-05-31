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

this.loginUser = function(login) {
  return $http({
    method: 'POST',
    url: '/login',
    data: login
  }).then(function(response){
    console.log(response);
  })
}



})
