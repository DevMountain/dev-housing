var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FaqSchema = new Schema ({
question: {type: String, required: true},
answer: {type: String, required: true}
})

module.exports = mongoose.model('Faq', FaqSchema)
