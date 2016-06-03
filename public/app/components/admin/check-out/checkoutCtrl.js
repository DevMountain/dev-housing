angular.module('devHousing').controller('adminCheckoutCtrl', function($scope, checkoutSvc, cohortSvc) {

    var start;
    var end;
    var interval;
    var duration;
    var slots;
    var campus;
    var schedule = [];
    var cohort;

    var getCohorts = function() {
      cohortSvc.getCohorts().then(function(response) {
        $scope.allCohorts = response;
      })
    };
    getCohorts();

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
            console.log(response);
            $scope.checkout = response;
        })

    }


})
