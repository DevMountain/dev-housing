angular.module('devHousing').directive('mobileSideBarNav', function() {
	return {
		restrict: "E",
		templateUrl: './app/shared/mobileSideBar/mobileSideBar.html',
		link: function(scope, elem, attrs) {

			$(".mobile-side-bar-slide-switch").click(function() {
				$(".mobile-side-bar-container").css({
					transform: 'translateX(0px)'
				});
			});

			$(".mobile-side-bar-logo").click(function() {
				$(".mobile-side-bar-container").css({
					transform: 'translateX(-266px)'
				});
			});
		}
	};
});