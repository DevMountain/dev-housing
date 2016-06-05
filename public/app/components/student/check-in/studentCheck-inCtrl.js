angular.module('devHousing')
.controller('studentCheck-inCtrl', function ($scope, checkinSvc, user) {

$scope.user = user;
console.log($scope.user);
$scope.hasSlot = true;

  //LOAD EXISTING CHECK INS AND FORMAT DATES
    let getCheckins = function(){
      checkinSvc.getCheckins().then(function(response){
        for (var i = 0; i < response.length; i++){
          response[i].checkinStart = moment(response[i].checkinStart).format('dddd MMMM Do YYYY - h:mm A');
          response[i].checkinEnd = moment(response[i].checkinEnd).format('dddd MMMM Do YYYY - h:mm A');
          for (var j = 0; j < response[i].checkinAppointments.length; j++){
            response[i].checkinAppointments[j].timeSlot = moment(response[i].checkinAppointments[j].timeSlot).format('h:mm A')
          }
        }
        $scope.allCheckins = response;
        for(var i = 0; i < $scope.allCheckins.length; i++) {
          for (var j = 0; j < $scope.allCheckins[i].checkinAppointments.length; j++) {
            if ($scope.allCheckins[i].checkinAppointments[j].user){
              if ($scope.allCheckins[i].checkinAppointments[j].user._id === $scope.user._id) {
                $scope.hasSlot = false;
              }
            }

          }
        }
      })
    };

    getCheckins();

    $scope.updateCheckins = (slot, check) => {
      checkinSvc.updateCheckins(slot, check).then( (response) => {
        getCheckins();
      })
    }
});
