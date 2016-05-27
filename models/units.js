var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var unitsSchema = new Schema ({
  campus: {type: String, required: true},
  propertyName: {type: String, required: true},
  address: {type: String, required: true},
  unitNumber: {type: Number, required: true},
  currentBedrooms: [{
    roomNumber: {type: String, required: true},
    maxOccupants: {type: Number, required: true},
    currentOccupants: [{Schema.Types.ObjectId, ref: 'Users'}]
  }],
  futureBedrooms: [{
    roomNumber: {type: String, required: true},
    maxOccupants: {type: Number, required: true},
    currentOccupants: [{Schema.Types.ObjectId, ref: 'Users'}]
  }],
  allOccupants: [{Schema.Types.ObjectId, ref: 'Users'}],
  adminNotes: {type: String, required: false}
})

module.exports = mongoose.model('Units', unitsSchema)
