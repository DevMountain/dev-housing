angular.module('devHousing').directive('studentSideBarNav', function() {
	return {
		restrict: "E",
		templateUrl: './app/shared/studentSideBar/studentSideBar.html',
		link: function(scope, elem, attrs) {

			$(".student-side-bar-slide-switch").click(function() {
				$(".student-side-bar-container").css({
					transform: 'translateX(0px)'
				});
			});

			$(".student-side-bar-logo").click(function() {
				$(".student-side-bar-container").css({
					transform: 'translateX(-266px)'
				});
			});
		}
	};
});