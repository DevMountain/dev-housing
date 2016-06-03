angular.module('devHousing').service('checkoutSvc', function($http){

this.createCheckout = function(data){
  return $http({
    method: 'POST',
    url: '/checkout',
    data: data
  }).then(function(response){
    return response.data
  })
};


})
