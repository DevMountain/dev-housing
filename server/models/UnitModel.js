var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnitSchema = new Schema ({
  campus: {type: String, required: true},
  propertyName: {type: String, required: true},
  address: {
    street1: {type: String, required: true},
    street2: {type: String},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true}
  },
  unitNumber: {type: Number, required: true},
  currentBedrooms: [{
    roomNumber: {type: String, required: true},
    maxOccupants: {type: Number, required: true},
    currentOccupants: [{type: Schema.Types.ObjectId, ref: 'User'}]
  }],
  futureBedrooms: [{
    roomNumber: {type: String, required: true},
    maxOccupants: {type: Number, required: true},
    futureOccupants: [{type: Schema.Types.ObjectId, ref: 'User'}]
  }],
  allCurrentOccupants: [{type: Schema.Types.ObjectId, ref: 'User'}],
  allFutureOccupants: [{type: Schema.Types.ObjectId, ref: 'User'}],
  adminNotes: {type: String, required: false}
});

module.exports = mongoose.model('Unit', UnitSchema)
