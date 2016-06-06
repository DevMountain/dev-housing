angular.module('devHousing').directive('userInfo', function() {
	return {
		restrict: "E",
		templateUrl: './app/shared/userInfo/userInfo.html',
		controller: function($scope, $state, userSvc) {
			$scope.logout = function () {
			  userSvc.logout().then(function(response) {
			    $state.go('login');
			  });
			}
		}
	};
});
