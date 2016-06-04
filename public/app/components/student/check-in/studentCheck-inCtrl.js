angular.module('devHousing')
.controller('studentCheck-inCtrl', function ($scope, checkinSvc, user) {

$scope.user = user;

  //LOAD EXISTING CHECK INS AND FORMAT DATES
    var getCheckins = function(){
      checkinSvc.getCheckins().then(function(response){
        for (var i = 0; i < response.length; i++){
          response[i].checkinStart = moment(response[i].checkinStart).format('dddd MMMM Do YYYY - h:mm A');
          response[i].checkinEnd = moment(response[i].checkinEnd).format('dddd MMMM Do YYYY - h:mm A');
          for (var j = 0; j < response[i].checkinAppointments.length; j++){
            response[i].checkinAppointments[j].timeSlot = moment(response[i].checkinAppointments[j].timeSlot).format('h:mm A')
          }
        }
        $scope.allCheckins = response;
      })
    };

    getCheckins();

});
