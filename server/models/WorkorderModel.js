var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkorderSchema = new Schema ({
problemType: {type: String, required: true},
description: {type: String, required: true},
dateSubmitted: {type: String, required: true, default: new Date()},
adminNotes: {type: String},
status: {type: String, required: true, default: 'pending'},
submittedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
unit: {type: mongoose.Schema.Types.ObjectId, ref: 'Unit'},
room: {type: String, required: true}
})

module.exports = mongoose.model('Workorder', WorkorderSchema)
