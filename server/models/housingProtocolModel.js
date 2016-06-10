var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProtocolSchema = new Schema ({
  title: {type: String, required: true},
  textBody: {type: String, required: true}
});

module.exports = mongoose.model('Protocol', ProtocolSchema);
