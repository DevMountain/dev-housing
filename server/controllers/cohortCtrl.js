var Cohort = require('../models/CohortModel.js')

module.exports = {

  create: function(req, res, next) {
    Cohort.create(req.body, function(err, response) {
        if (err) {
            return res.status(500).send(err);
        } else {
          res.status(200).send(response);
        }
    });
  },

  read: function(req, res, next) {
    Cohort.findOne({}, function(err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.status(200).send(response)
      }
    });
  },

  update: function(req, res, next) {
    Cohort.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if (err) {
        return res.status(500).send(err);
      } else {
        res.status(200).send(response)
      }
    });
  }

}
