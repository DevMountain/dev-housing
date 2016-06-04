angular.module('devHousing')
.controller('studentCheck-outCtrl', function ($scope, checkoutSvc) {

  //LOAD EXISTING CHECK OUTS AND FORMAT DATES
  var getCheckouts = function(){
    checkoutSvc.getCheckouts().then(function(response){
      for (var i = 0; i < response.length; i++){
        response[i].checkoutStart = moment(response[i].checkoutStart).format('dddd MMMM Do YYYY - h:mm A');
        response[i].checkoutEnd = moment(response[i].checkoutEnd).format('dddd MMMM Do YYYY - h:mm A');
        for (var j = 0; j < response[i].checkoutAppointments.length; j++){
          response[i].checkoutAppointments[j].timeSlot = moment(response[i].checkoutAppointments[j].timeSlot).format('h:mm A')
        }
      }
      $scope.allCheckouts = response;
    })
  };

  getCheckouts();

});
