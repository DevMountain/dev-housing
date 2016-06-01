var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CohortSchema = new Schema ({
provo: {
  senior: {type: String, required: true},
  junior: {type: String, required: true},
  future: {type: String, required: true}
},
slc: {
  senior: {type: String, required: true},
  junior: {type: String, required: true},
  future: {type: String, required: true}
},
dallas: {
  senior: {type: String, required: true},
  junior: {type: String, required: true},
  future: {type: String, required: true}
}
});

module.exports = mongoose.model('Cohort', CohortSchema);
