angular.module('devHousing').service('unitSvc', function($http){

  this.getUnits = function(){
    return $http({
      method: 'GET',
      url: '/units'
    }).then(function(response){
      return response.data;
  });
  };

  this.addUserToUnitCurrent = function(data, id) {
    return $http({
      method: 'PUT',
      url: '/unit/add/current/' + id,
      data: data
    }).then(function(response){
      return response.data;
    });
  };

  this.removeUserFromUnitCurrent = function(data, id) {
    return $http({
      method: 'PUT',
      url: '/unit/remove/current/' + id,
      data: data
    }).then(function(response){
      return response.data;
    });
  };

  this.addUserToUnitFuture = function(data, id) {
    return $http({
      method: 'PUT',
      url: '/unit/add/future/' + id,
      data: data
    }).then(function(response){
      return response.data;
    });
  };

  this.removeUserFromUnitFuture = function(data, id) {
    return $http({
      method: 'PUT',
      url: '/unit/remove/future/' + id,
      data: data
    }).then(function(response){
      return response.data;
    });
  };

  // this.setCurrentToFuture = function(data) {
  //
  // };

});
