var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckinSchema = new Schema ({
checkinStart: {type: Date, required: true},
checkinEnd: {type: Date, required: true},
cohort: {type: String, required: true},
campus: {type: String, required: true},
slotInterval: {type: Number, required: true},
checkinAppointments:
[{
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  unit: {type: Number},
  room: {type: String},
  timeSlot: {type: Date}
}]

})

module.exports = mongoose.model('Checkin', CheckinSchema)
