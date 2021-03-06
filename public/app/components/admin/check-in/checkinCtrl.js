angular.module('devHousing').controller('adminCheckinCtrl', function($scope, user, checkinSvc, cohortSvc, userSvc) {

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
    var getCohorts = function(){
      cohortSvc.getCohorts().then(function(response){
        $scope.allCohorts = response;
        });
    };
    getCohorts();

//LOAD EXISTING CHECK INS AND FORMAT DATES
  var getCheckins = function(){
    checkinSvc.getCheckins().then(function(response){
      for (var i = 0; i < response.length; i++){
        response[i].checkinDay = moment(response[i].checkinStart).format('dddd MMMM Do');
        response[i].checkinStart = moment(response[i].checkinStart).format('h:mm');
        response[i].checkinEnd = moment(response[i].checkinEnd).format('h:mm A');
        for (var j = 0; j < response[i].checkinAppointments.length; j++){
          response[i].checkinAppointments[j].timeSlot = moment(response[i].checkinAppointments[j].timeSlot).format('h:mm A');
        }
      }
      $scope.allCheckins = response;
  });
  };

  getCheckins();

//CREATE CHECKIN DAY WITH SLOTS
    $scope.createCheckin = function(info) {
        start = moment(info.start);
        end = moment(info.end);
        interval = info.interval;
        campus = info.campus;
        cohort = info.cohort;
        createSchedule();
    };

    var createSchedule = function(slots) {
        duration = end.diff(start, 'minutes');
        slots = duration / interval;

        for (var i = 0; i < slots; i++) {
            var addTime = i * interval;
            var newAppointment = start.clone().add(addTime, 'minutes');
            var appointment = {timeSlot: newAppointment.format()};
            schedule.push(appointment);
        }
        var checkinObj = {
          checkinStart: start.format(),
          checkinEnd: end.format(),
          slotInterval: interval,
          campus: campus,
          cohort: cohort,
          checkinAppointments: schedule
      };

        setSchedule(checkinObj);
    };

    var setSchedule = function(checkinObj){
      checkinSvc.createCheckin(checkinObj).then(function(response){
        $scope.checkin = response;
      });
      getCheckins();
    };

$scope.deleteCheckins = function(checkin) {
    checkinSvc.deleteCheckins(checkin).then(function(response) {
        getCheckins();
    });
};

// update single user
$scope.updateUser = function(user) {
    // this is to update multiple cohorts to an array
    var cohorts = [];
    cohorts.push(user.cohortID[0]);
    if (user.cohortID[1]) {
        cohorts.push(user.cohortID[1]);
    };
    if (user.cohortID[2]) {
        cohorts.push(user.cohortID[2]);
    };
    user.cohortID = cohorts;
    userSvc.update(user).then(function(response) {
        console.log("Successfully updated user from Check-In");
    });
};

});
