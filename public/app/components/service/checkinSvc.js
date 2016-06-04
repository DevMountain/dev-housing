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

this.getCheckins = function(){
  return $http({
    method: 'GET',
    url: '/checkins'
  }).then(function(response){
    return response.data
  })
};

this.updateCheckins = (obj) => {
  return $http({
    method: 'PUT',
    url: `/checkin/:${obj._id}`,
    data: obj
  }).then( (response) => {
      console.log('this');
      return response.data;
  })
};


// End of Service
})
