angular.module("devHousing").controller("modalCtrl", function($scope, ModalService) {
  
  $scope.confirmationAnswer = 'No answer yet';
  
  $scope.openConfirm = function() {
    ModalService.showModal({
      // Template file for modal
      templateUrl: "./app/components/modals/confirmModal/confirmTemplate.html",
      // Controller file for modal
      controller: "confirmCtrl",
      // Variables being passed into modal
      inputs: {
        // Will be injected into controller as 'text'
        text: "Thank you for clicking my button. Are you sure you want to continue?"
      }
    }).then(function(modal) {
      // Funtion that runs when modal closes
      modal.close.then(function(then) {
        // then = whatever the close() function in the modal returns
        $scope.confirmationAnswer = then;
      });
    });
  };

})