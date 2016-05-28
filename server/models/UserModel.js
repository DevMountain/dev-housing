var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema;

var User = new Schema ({
  name: {type: String, required: true},
  birthdate: {type: Date, required: true}, //convert to date first
  gender: {type: String, required: true},
  DevmtnID: {type: String},
  email: {type: String, index: true, trim: true, required: true},
  password: {type: String},
  cohortID: {type: String, required: true},
  role: {type: String, required: true, default: 'student'}, //default
  adminNotes: {type: String},
  phone: {type: Number, required: true},
  currentAddress: {type: String, required: true},
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

User.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password'))	return next();
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next(null, user);
});

User.methods.verifyPassword = function(reqBodyPassword) {
  var user = this;
  return bcrypt.compareSync(reqBodyPassword, user.password);
};

module.exports = mongoose.model('User', User)
