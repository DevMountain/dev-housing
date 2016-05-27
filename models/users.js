var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema ({
  name: {type: String, required: true},
  birthdate: {type: Date, required: true}, //convert to date first
  gender: {type: String, required: true},
  DevmtnID: {type: String},
  email: {type: String, required: true},
  cohortID: {type: String, required: true},
  role: {type: String, required: true, default: 'student'}, //default
  adminNotes: {type: String},
  phone: {type: Number, required: true},
  currentAddress: {type: String, required: true}
  licenseOnFile: {type: Boolean},
  backgroundCheck: {type: Boolean},
  car: {
    make: {type: String},
    model: {type: String},
    year: {type: Number},
    license: {type: String}
  },
  deposit: {
    amount: {type: Number},
    paid: {type: Date},
    returned: {type: Date}
  },
  checkInOut: {
    checkInDate: {type: Date},
    checkInStatus: {type: Boolean},
    checkOutDate: {type: Date},
    checkOutStatus: {type: Boolean},
  }
})

module.exports = mongoose.model('Users', usersSchema)
