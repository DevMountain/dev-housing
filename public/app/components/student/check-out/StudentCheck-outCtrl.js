angular.module('devHousing')
.controller('studentCheck-outCtrl', function ($scope, checkinSvc, user) {

$scope.user = user;
$scope.hasSlot = true;

  //LOAD EXISTING CHECK INS AND FORMAT DATES
    let getCheckins = function(){
      checkinSvc.getCheckins().then(function(response){
        for (let i = 0; i < response.length; i++){
          response[i].checkoutDay = moment(response[i].checkoutStart).format('dddd MMMM Do')
          response[i].checkoutStart = moment(response[i].checkoutStart).format('h:mm');
          response[i].checkoutEnd = moment(response[i].checkoutEnd).format('h:mm A');
          for (let j = 0; j < response[i].checkoutAppointments.length; j++){
            response[i].checkoutAppointments[j].timeSlot = moment(response[i].checkoutAppointments[j].timeSlot).format('h:mm A')
          }
        }
        $scope.allCheckins = response;
        for(let i = 0; i < $scope.allCheckins.length; i++) {
          for (let j = 0; j < $scope.allCheckins[i].checkinAppointments.length; j++) {
            if ($scope.allCheckins[i].checkinAppointments[j].user){
              if ($scope.allCheckins[i].checkinAppointments[j].user._id === $scope.user._id) {
                $scope.hasSlot = false;
              }
            }
          }
        }
    });
    };

    getCheckins();

    $scope.updateCheckouts = (slot, check) => {
      checkoutSvc.updateCheckouts(slot, check).then( (response) => {
        getCheckouts();
    });
};
});
