var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workordersSchema = new Schema ({
problemType: {type: String, required: true},
description: {type: String, required: true},
dateSubmitted: {type: String, required: true, default: new Date()},
adminNotes: {type: String},
status: {type: String, required: true, default: 'pending'},
submittedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
unit: {type: mongoose.Schema.Types.ObjectId, ref: 'Units'},
room: {type: String, required: true}
})

module.exports = mongoose.model('Workorders', workordersSchema)
