angular.module('devHousing').controller('adminProtocolCtrl', function($scope, protocolSvc, user) {

$scope.user = user;

// Selecting a Housing Protocol to edit/remove
$scope.selectProtocol = function(protocol) {
  $scope.selected = protocol;
};

// Add new Housing Protocol
$scope.newProtocol = {};
$scope.addNewProtocol = function(newProtocol) {
  protocolSvc.createProtocol(newProtocol).then(function(response) {
    $scope.displayAllProtocols();
    $scope.newProtocol = {};
  });
};

// Display all Housing protocols
$scope.displayAllProtocols = function() {
  protocolSvc.getProtocols().then(function(response) {
    $scope.protocols = response;
  });
};

$scope.displayAllProtocols();

//  Update sing Housing Protocol
$scope.selected = {};
$scope.updateProtocol = function(protocol) {
  protocolSvc.updateProtocol(protocol).then(function(response) {
    $scope.displayAllProtocols();
    $scope.selected = {};
  });
};

//  Delete single Housing Protocol
$scope.selected = {};
$scope.deleteProtocol = function(protocol) {
  protocolSvc.deleteProtocol(protocol).then(function(response) {
    $scope.displayAllProtocols();
    $scope.selected = {};
  });
};

});
