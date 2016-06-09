angular.module("devHousing").controller("modalCtrl", function($scope, ModalService) {

  $scope.confirmationAnswer = 'No answer yet';

  $scope.openConfirm = function() {
    ModalService.showModal({
      templateUrl: "./app/components/modals/confirmModal/confirmTemplate.html",
      controller: "confirmCtrl",
      // Variables being passed into modal
      inputs: {
        // Will be injected into controller as 'text'
        text: "You're information has been submitted. Thank you for applying to DevMountain Housing."
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
