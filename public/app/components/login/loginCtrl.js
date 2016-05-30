angular.module('devHousing').controller('loginCtrl', function($scope, userSvc){


$scope.submitSignUp = function(user) {
  console.log('submitted ', user);
  if (user) {
    userSvc.createUser(user).then(function(response){
      //do something with response
      console.log(response);
    })
  }

  }

})
