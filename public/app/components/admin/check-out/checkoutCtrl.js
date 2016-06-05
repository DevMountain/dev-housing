angular.module('devHousing').controller('adminCheckoutCtrl', function($scope, checkoutSvc, cohortSvc, user) {

    $scope.user = user;

    var start;
    var end;
    var interval;
    var duration;
    var slots;
    var campus;
    var schedule = [];
    var cohort;

//LOAD ALL COHORTS FOR NG-OPTIONS
    var getCohorts = function() {
      cohortSvc.getCohorts().then(function(response) {
        $scope.allCohorts = response;
      })
    };
    getCohorts();

//LOAD EXISTING CHECK INS AND FORMAT DATES
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




    $scope.createCheckout = function(info) {
        start = moment(info.start);
        end = moment(info.end)
        interval = info.interval;
        campus = info.campus;
        cohort = info.cohort
        createSchedule();
    }


    var createSchedule = function(slots) {
        duration = end.diff(start, 'minutes');
        slots = duration / interval;

        for (var i = 0; i < slots; i++) {
            var addTime = i * interval;
            var newAppointment = start.clone().add(addTime, 'minutes');
            var appointment = {
                timeSlot: newAppointment.format()
            }
            schedule.push(appointment);
        }
        var checkoutObj = {
            checkoutStart: start.format(),
            checkoutEnd: end.format(),
            cohort: 'DM-10', // ADD COHORT INPUT
            slotInterval: interval,
            campus: campus,
            cohort: cohort,
            checkoutAppointments: schedule
        }
        setSchedule(checkoutObj);
    }

    var setSchedule = function(checkoutObj) {
        checkoutSvc.createCheckout(checkoutObj).then(function(response) {
            $scope.checkout = response;
        })

    }


})
