angular.module('devHousing').controller('loginCtrl', function($scope, userSvc){

$scope.showLogin = true;



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


  $scope.submitLogin = function(login) {
    console.log('logging in ', login);
    if ($scope.loginForm.$valid){
      console.log('login valid');
      userSvc.loginUser(login).then(function(response){

        console.log(response);
      })
    }
  }

$scope.loginSwitch = function(){
  $scope.showLogin = !$scope.showLogin
}



})
