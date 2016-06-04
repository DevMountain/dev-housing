angular.module('devHousing').service('unitSvc', function($http){

  this.getUnits = function(){
    return $http({
      method: 'GET',
      url: '/units'
    }).then(function(response){
      return response.data;
  });
  };

  this.addUserToUnit = function(data, id) {
    return $http({
      method: 'PUT',
      url: '/unit/add/' + id,
      data: data
    }).then(function(response){
      return response.data
    });
  };

  this.removeUserFromUnit = function(data, id) {
    return $http({
      method: 'PUT',
      url: '/unit/remove/' + id,
      data: data
    }).then(function(response){
      return response.data
    });
  };

});
