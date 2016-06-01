angular.module('devHousing').service('unitSvc', function($http){

  this.getUnits = function(){
    return $http({
      method: 'GET',
      url: '/units'
    }).then(function(response){
      return response.data
    })
  };

  //should we add ability to add housing later?


})
