angular.module('devHousing').service('cohortSvc', function($http){

  this.getCohorts = function() {
    return $http({
      method: 'GET',
      url: '/cohorts'
    }).then(function(response) {
      console.log('service response ', response);
    })
  }

})
