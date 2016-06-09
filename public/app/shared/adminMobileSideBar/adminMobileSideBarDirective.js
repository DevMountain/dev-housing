angular.module('devHousing').directive('adminMobileSideBarNav', function() {
	return {
		restrict: "E",
		templateUrl: './app/shared/adminMobileSideBar/adminMobileSideBar.html',
		link: function(scope, elem, attrs) {

			$(".admin-mobile-side-bar-slide-switch").click(function() {
				$(".admin-mobile-side-bar-container").css({
					transform: 'translateX(0px)'
				});
			});

			$(".admin-mobile-side-bar-logo").click(function() {
				$(".admin-mobile-side-bar-container").css({
					transform: 'translateX(-266px)'
				});
			});
		}
	};
});