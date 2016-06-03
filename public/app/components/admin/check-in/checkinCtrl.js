angular.module('devHousing').controller('adminCheckinCtrl', function($scope, checkinSvc, cohortSvc) {

    var start;
    var end;
    var interval;
    var duration;
    var slots;
    var campus;
    var schedule = [];
    var cohort;

//LOAD ALL COHORTS FOR NG-OPTIONS
    var getCohorts = function(){
      cohortSvc.getCohorts().then(function(response){
        $scope.allCohorts = response;
      })
    };
    getCohorts();

//LOAD EXISTING CHECK INS
  var getCheckins = function(){
    checkinSvc.getCheckins().then(function(response){
      console.log(response);
      $scope.allCheckins = response;
    })
  };

  getCheckins();




    $scope.createCheckin = function(info) {
        start = moment(info.start);
        end = moment(info.end)
        interval = info.interval;
        campus = info.campus
        cohort = info.cohort
        createSchedule();
    }

    var createSchedule = function(slots) {
        duration = end.diff(start, 'minutes');
        slots = duration / interval;

        for (var i = 0; i < slots; i++) {
            var addTime = i * interval;
            var newAppointment = start.clone().add(addTime, 'minutes');
            var appointment = {timeSlot: newAppointment.format()}
            schedule.push(appointment);
        }
        var checkinObj = {
          checkinStart: start.format(),
          checkinEnd: end.format(),
          slotInterval: interval,
          campus: campus,
          cohort: cohort,
          checkinAppointments: schedule
        }

        setSchedule(checkinObj);
    }

    var setSchedule = function(checkinObj){
      checkinSvc.createCheckin(checkinObj).then(function(response){
        console.log(response);
        $scope.checkin = response;
      })

    }


})
