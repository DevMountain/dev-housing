angular.module("devHousing").controller("confirmCtrl", function($scope, ModalService, text, close) {
  // Basic controller file
  // As you can see, 'text' and 'close' are being passed into our controller

  // 'text' is the text value of the 'inputs' object we passed into the controller when we called it

  // 'Close' is a function that gets passed into all modal controllers
  // Calling 'close()' will close the modal
  // Passing a variable into the close function will pass it back to the controller that called the modal.

  // Save text and close to the scope so that they can be used by the html
  $scope.text = text;
  $scope.close = close;
});