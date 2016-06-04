angular.module('devHousing').service('userSvc', function($http) {

    this.createUser = function(user) {
        return $http({
            method: 'POST',
            url: '/user',
            data: user
        }).then(function(response) {
            return response.data;
        });
    };

    this.loginUser = function(login) {
        return $http({
            method: 'POST',
            url: '/login',
            data: login
        }).then(function(response) {
            return response.data;
        });
    };

    this.getUsers = function() {
      return $http({
        method: 'GET',
        url: '/users'
      }).then(function(response){
        return response.data;
    });
    };

    this.getCurrentUser = () => {
      // console.log(`from getCurrentUser`);
      return $http({
        method: 'GET',
        url: '/me'
      }).then( (response) => {
        console.log(JSON.stringify(response));
        return response;
      })
    }

    //update user
    this.update = function(user) {
        return $http({
            method: 'PUT',
            url: '/user/' + user._id,
            data: user
        }).then(function(response) {
            return response.data;
        });
    };


});  // closing tag
