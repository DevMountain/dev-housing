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
        }).catch(function(err) {
            return err;
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
      return $http({
        method: 'GET',
        url: '/me'
      }).then( (response) => {
        delete response.data.password;
        return response;
    });
};

    //update user
    this.update = function(user) {
        delete user.password;
        return $http({
            method: 'PUT',
            url: '/user/' + user._id,
            data: user
        }).then(function(response) {
            return response.data;
        });
    };

    //delete user
    this.delete = function(user) {
        return $http({
            method: 'DELETE',
            url: '/user/' + user._id,
        }).then(function(response) {
            return response.data;
        });
    };

    //logout user
    this.logout = function() {
      return $http({
        method: 'GET',
        url: '/logout',
      }).then(function(response) {
        return response;
      });
    };


});  // closing tag
