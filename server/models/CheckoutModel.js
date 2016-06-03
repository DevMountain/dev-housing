var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CheckoutModel = new Schema ({
checkoutStart: {type: Date, required: true},
checkoutEnd: {type: Date, required: true},
cohort: {type: String, required: true},
campus: {type: String, required: true},
slotInterval: {type: Number, required: true},
checkoutAppointments:
[{
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  unit: {type: Number},
  room: {type: String},
  timeSlot: {type: Date}
}]

})

module.exports = mongoose.model('Checkout', CheckoutModel)
