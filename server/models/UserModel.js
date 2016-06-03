var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var User = new Schema ({
  //required properties
  firstName: {type: String, required: true, trim: true},
  lastName: {type: String, required: true, trim: true},
  birthdate: {type: Date, required: true}, //convert to date first
  gender: {type: String, required: true},
  email: {type: String, index: true, trim: true, required: true},
  password: {type: String, required: true},
  phone: {type: String, required: true},
  inHousing:{type: Boolean, required: true, default: false},
  campus: {type: String, required: true},
  currentAddress: {
    city: {type: String, required: true},
    state: {type: String, required: true}
  },
  role: {type: String, required: true, default: 'student'},
  //not required
  devmtnID: {type: Number},
  cohortID: {type: String},
  adminAccess: [{type: String}], //make object?
  adminDefaultView: {type: String},
  adminNotes: {type: String},
  licenseOnFile: {type: Boolean},
  backgroundCheck: {type: Boolean},
  deposit: {
    depositAmount: {type: Number},
    depositPaid: {type: Date},
    depositReturned: {type: Date}
  },
  singleRoom: {
    wantsSingleRoom: {type: Boolean, default: false},
    hasSingleRoom: {type: Boolean, default: false},
    singleRoomFee: {
      roomFeePaid: {type: Boolean, default: false},
      amount: {type: Number},
      paidDate: {type: Date}
    }
  },
  rent: {
    isRenter: {type: Boolean, default: false},
    rentPrice: {type: Number, default: 0},
    rentPaid: [{type: Date}]
  },
  car: {
    make: {type: String},
    model: {type: String},
    year: {type: Number},
    license: {type: String}
  },
  checkInOut: {
    checkInDate: {type: Date},
    checkInStatus: {type: Boolean},
    checkOutDate: {type: Date},
    checkOutStatus: {type: Boolean}
  }
});

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

module.exports = mongoose.model('User', User);
