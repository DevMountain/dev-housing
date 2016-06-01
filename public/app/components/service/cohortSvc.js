angular.module('devHousing').service('cohortSvc', function($http){

  this.getCohorts = function() {
    return $http({
      method: 'GET',
      url: '/cohorts'
    }).then(function(response) {
      return response.data;
    })
  }

  this.saveCohorts = function(cohorts) {
    return $http({
      method: 'PUT',
      url: '/cohorts/' + cohorts._id,
      data: cohorts
    }).then(function(response) {
      return response.data
    })
  }

})
