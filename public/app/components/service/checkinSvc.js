angular.module('devHousing').service('checkinSvc', function($http){

this.createCheckin = function(data){
  return $http({
    method: 'POST',
    url: '/checkin',
    data: data
  }).then(function(response){
    return response.data
  })
};


})
