angular.module('devHousing')
.controller('studentCheck-outCtrl', function ($scope, checkoutSvc, user) {

$scope.user = user;
$scope.hasSlot = true;

  //LOAD EXISTING CHECK OUTS AND FORMAT DATES
    let getCheckouts = function(){
      checkoutSvc.getCheckouts().then(function(response){
        for (let i = 0; i < response.length; i++){
          response[i].checkoutStart = moment(response[i].checkoutStart).format('dddd MMMM Do YYYY - h:mm A');
          response[i].checkoutEnd = moment(response[i].checkoutEnd).format('dddd MMMM Do YYYY - h:mm A');
          for (let j = 0; j < response[i].checkoutAppointments.length; j++){
            response[i].checkoutAppointments[j].timeSlot = moment(response[i].checkoutAppointments[j].timeSlot).format('h:mm A')
          }
        }
        $scope.allCheckouts = response;
        for(let i = 0; i < $scope.allCheckouts.length; i++) {
          for (let j = 0; j < $scope.allCheckouts[i].checkoutAppointments.length; j++) {
            if ($scope.allCheckouts[i].checkoutAppointments[j].user){
              if ($scope.allCheckouts[i].checkoutAppointments[j].user._id === $scope.user._id) {
                $scope.hasSlot = false;
              }
            }
          }
        }
      })
    };

    getCheckouts();

    $scope.updateCheckouts = (slot, check) => {
      checkoutSvc.updateCheckouts(slot, check).then( (response) => {
        getCheckouts();
      })
    }
});
