angular.module('devHousing')
  .service('workorderSvc', function ($http) {

    this.workorderCreate = (obj) => {
      console.log('-----now at Service: Create: ' + obj);
      return $http({
        method: 'POST',
        url: '/workorder',
        data: obj
      }).then( (response) => {
        console.log('****Still Service, .then: ' + response.data);
        response.data});
    };

    this.workorderRead = () => {
      console.log('-----now at Service: READ');
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

    this.workorderUpdate = (obj, id) => {
      return $http({
        method: 'PUT',
        url: `/workorder/:${id}`,
        data: obj
      }).then( (response) => response.data);
    };

    this.workorderDelete = (id) => {
      return $http({
        method: 'DELETE',
        url: `/workorder/:${id}`
      }).then( (response) => response.data);
    };

//End of Service
  });
