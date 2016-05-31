angular.module('devHousing').controller('loginCtrl', function($scope, userSvc){


$scope.submitSignUp = function(user) {
  console.log('submitted ', user);
  if($scope.signupForm.$valid){
    console.log('very valid');
    $scope.signupForm.$setPristine(); //not working, and probably unnecessary anyway
    userSvc.createUser(user).then(function(response){
      //do something with response
      console.log(response);
    })
  }

  }

})
