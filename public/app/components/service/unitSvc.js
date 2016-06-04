angular.module('devHousing').service('unitSvc', function($http){

  this.getUnits = function(){
    return $http({
      method: 'GET',
      url: '/units'
    }).then(function(response){
      return response.data;
  });
  };

  this.updateUnit = function(data, id) {
    return $http({
      method: 'PUT',
      url: '/unit/' + id,
      data: data
    }).then(function(response){
      return response.data
    });
  };


});
