var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CohortSchema = new Schema ({
Provo: {
  senior: {type: String, required: true},
  junior: {type: String, required: true},
  future: {type: String, required: true}
},
SLC: {
  senior: {type: String, required: true},
  junior: {type: String, required: true},
  future: {type: String, required: true}
},
Dallas: {
  senior: {type: String, required: true},
  junior: {type: String, required: true},
  future: {type: String, required: true}
}
});

module.exports = mongoose.model('Cohort', CohortSchema);
