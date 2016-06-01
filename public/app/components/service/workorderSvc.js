angular.module('devHousing')
  .service('workorderSvc', function ($http) {

    this.workorderCreate = (obj) => {
      return $http({
        method: 'POST',
        url: '/workorder',
        data: obj
      }).then( (response) => {
        response.data});
    };

    this.workorderRead = () => {
      return $http({
        method: 'GET',
        url: '/workorders'
      }).then( (response) => response.data );
    };

    this.workorderReadId = (workorder) => {
      return $http({
        method: 'GET',
        url: `/workorder/${workorder._id}`
      }).then( (response) => response.data );
    };

    this.workorderUpdate = (obj) => {
      return $http({
        method: 'PUT',
        url: `/workorder/${obj._id}`,
        data: obj
      }).then( (response) => {
        response.data
      });
    };

    this.workorderDelete = (id) => {
      return $http({
        method: 'DELETE',
        url: `/workorder/${id}`
      }).then( (response) => response.data);
    };

//End of Service
  });
