var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckInOutSchema = new Schema ({
checkInDate: {type: Date, required: true},
checkInDetails:
[{
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  unit: {type: Number},
  room: {type: String},
  campus: {type: String},
  timeSlot: {type: String}
}]

// checkOut: [
//   {
//     date: {type: Date, required: true},
//     length: {type: Number, required: true, default: 15},
//     user: {type: Schema.Types.ObjectId, ref: 'User'},
//     unit: {type: String, required: true},
//     room: {type: String, required: true},
//     campus: {type: String, required: true}
//   }
// ]

})

module.exports = mongoose.model('CheckInOut', CheckInOutSchema)
