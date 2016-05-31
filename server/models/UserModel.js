var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
var Schema = mongoose.Schema;

var User = new Schema ({
  firstName: {type: String, required: true, trim: true},
  lastName: {type: String, required: true, trim: true},
  birthdate: {type: Date, required: true}, //convert to date first
  gender: {type: String, required: true},
  devmtnID: {type: Number},
  campus: {type: String},
  email: {type: String, index: true, trim: true, required: true},
  password: {type: String, required: true},
  cohortID: [{type: Number}],
  role: {type: String, required: true, default: 'student'}, //default
  adminAccess: [{type: String}],
  adminDefaultView: [{type: String}],
  adminNotes: {type: String},
  phone: {type: String, required: true},
  licenseOnFile: {type: Boolean},
  backgroundCheck: {type: Boolean},
  rent: {
    isRenter: {type: Boolean, default: false},
    price: {type: Number, default: 0},
    paid: [{type: Date}]
  },
  currentAddress: {
    street1: {type: String, required: true},
    street2: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
  },
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
