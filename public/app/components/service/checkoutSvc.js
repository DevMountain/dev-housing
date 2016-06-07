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

this.getCheckouts = function(){
  return $http({
    method: 'GET',
    url: '/checkouts'
  }).then(function(response){
    return response.data
  })
};

this.updateCheckouts = (slot, check) => {
  return $http({
    method: 'PUT',
    url: `/checkout/${check._id}`,
    data: slot
  }).then( (response) => {
      return response.data;
  })
};

//End of Service
})
