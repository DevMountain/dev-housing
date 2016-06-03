angular.module('devHousing').controller('adminCheck-inCtrl', function($scope) {

    var start = moment();
    var end = moment().add(2, 'hours')
    var interval = 30;

    var duration = end.diff(start, 'minutes');
    var slots = duration / interval;

    var schedule = [];
    var createSchedule = function(slots) {
        for (var i = 0; i < slots; i++) {
            var addTime = i * interval;
            var newAppointment = start.clone().add(addTime, 'minutes');
            schedule.push(newAppointment.format());
        }
        console.log(schedule);
    }
    createSchedule(slots);




})
