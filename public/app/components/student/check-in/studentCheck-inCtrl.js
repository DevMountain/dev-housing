angular.module('devHousing')
.controller('studentCheck-inCtrl', function ($scope, checkinSvc, user) {

$scope.user = user;
$scope.hasSlot = true;

  //LOAD EXISTING CHECK INS AND FORMAT DATES
    let getCheckins = function(){
      checkinSvc.getCheckins().then(function(response){
        for (let i = 0; i < response.length; i++){
          response[i].checkinDay = moment(response[i].checkinStart).format('dddd MMMM Do');
          response[i].checkinStart = moment(response[i].checkinStart).format('h:mm');
          response[i].checkinEnd = moment(response[i].checkinEnd).format('h:mm A');
          for (let j = 0; j < response[i].checkinAppointments.length; j++){
            response[i].checkinAppointments[j].timeSlot = moment(response[i].checkinAppointments[j].timeSlot).format('h:mm A')
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

    $scope.updateCheckins = (slot, check) => {
      checkinSvc.updateCheckins(slot, check).then( (response) => {
        getCheckins();
    });
};
});
