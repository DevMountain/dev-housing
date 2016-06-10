angular.module('devHousing').controller('adminCheckoutCtrl', function($scope, checkoutSvc, cohortSvc, user, userSvc) {

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
    });
    };
    getCohorts();

//LOAD EXISTING CHECK INS AND FORMAT DATES
var getCheckouts = function(){
  checkoutSvc.getCheckouts().then(function(response){
    for (var i = 0; i < response.length; i++){
      response[i].checkoutDay = moment(response[i].checkoutStart).format('dddd MMMM Do')
      response[i].checkoutStart = moment(response[i].checkoutStart).format('h:mm');
      response[i].checkoutEnd = moment(response[i].checkoutEnd).format('h:mm A');
      for (var j = 0; j < response[i].checkoutAppointments.length; j++){
        response[i].checkoutAppointments[j].timeSlot = moment(response[i].checkoutAppointments[j].timeSlot).format('h:mm A')
      }
    }
    $scope.allCheckouts = response;
});
};

getCheckouts();

//CREATE CHECKOUT DAY WITH SLOTS
    $scope.createCheckout = function(info) {
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
        var checkoutObj = {
            checkoutStart: start.format(),
            checkoutEnd: end.format(),
            cohort: 'DM-10', // ADD COHORT INPUT
            slotInterval: interval,
            campus: campus,
            cohort: cohort,
            checkoutAppointments: schedule
        };
        setSchedule(checkoutObj);
    };

    var setSchedule = function(checkoutObj) {
        checkoutSvc.createCheckout(checkoutObj).then(function(response) {
            $scope.checkout = response;
        });
        getCheckouts();
    };

    $scope.deleteCheckouts = function(checkout) {
        checkoutSvc.deleteCheckouts(checkout).then(function(response) {
            getCheckouts();
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

});  // closing tag
