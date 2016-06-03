angular.module('devHousing').controller('adminCheckoutCtrl', function($scope) {

  var start;
  var end;
  var interval;
  var duration;
  var slots;
  var campus;
  var schedule = [];

  $scope.createCheckout = function(info) {
      start = moment(info.start);
      end = moment(info.end)
      interval = info.interval;
      campus = info.campus
      createSchedule();
  }


  var createSchedule = function(slots) {
      duration = end.diff(start, 'minutes');
      slots = duration / interval;

      for (var i = 0; i < slots; i++) {
          var addTime = i * interval;
          var newAppointment = start.clone().add(addTime, 'minutes');
          schedule.push(newAppointment.format());
      }
      var checkoutObj = {
        checkoutStart: start.format(),
        checkoutEnd: end.format(),
        slotInterval: interval,
        campus: campus,
        schedule: schedule
      }
      setSchedule(checkoutObj);
  }

  var setSchedule = function(checkoutObj){
    checkoutSvc.createCheckout(checkoutObj).then(function(response){
      console.log(response);
      $scope.checkout = response;
    })

  }


})
