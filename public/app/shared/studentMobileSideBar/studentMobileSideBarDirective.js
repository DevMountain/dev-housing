angular.module('devHousing').directive('studentMobileSideBarNav', function() {
	return {
		restrict: "E",
		templateUrl: './app/shared/studentMobileSideBar/studentMobileSideBar.html',
		link: function(scope, elem, attrs) {

			$(".student-mobile-side-bar-slide-switch").click(function() {
				$(".student-mobile-side-bar-container").css({
					transform: 'translateX(0px)'
				});
			});

			$(".student-mobile-side-bar-logo").click(function() {
				$(".student-mobile-side-bar-container").css({
					transform: 'translateX(-266px)'
				});
			});
		}
	};
});