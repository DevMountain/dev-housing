angular.module('devHousing').controller('loginCtrl', function($scope, userSvc, $state){

$scope.showLogin = true;



$scope.submitSignUp = function(user) {
  if($scope.signupForm.$valid){
    userSvc.createUser(user).then(function(response){
      //do something with response
    })
  }
  }


  $scope.submitLogin = function(login) {
    if ($scope.loginForm.$valid){
      userSvc.loginUser(login).then(function(response){
        //add response for incorrect email/password combo
        if (response.role === 'student') {
          $state.go('student-home');
        } else {
          $state.go('admin-home');
        }
      })
    }
  }

$scope.loginSwitch = function(){
  $scope.showLogin = !$scope.showLogin
}



})
