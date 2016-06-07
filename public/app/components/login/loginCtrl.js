angular.module('devHousing').controller('loginCtrl', function($scope, userSvc, $state){

$scope.showLogin = true;



$scope.submitSignUp = function(user) {
  if($scope.signupForm.$valid){
    user.cohortID = [];
    userSvc.createUser(user).then(function(response){
      //do something with response
    })
  }
  }


  $scope.submitLogin = function(login) { //TODO clear password on submit
    if ($scope.loginForm.$valid){
      userSvc.loginUser(login).then(function(response){
        if (response.cohortID.length === 0) {
          $state.go('pending');
        } else if (response.role === 'student') {
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
