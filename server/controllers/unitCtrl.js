var Unit = require('../models/UnitModel.js');

module.exports = {

  create: function(req, res, next) {
    Unit.create(req.body, function (err, response) {
      if(err) return res.status(500).send(err);
      res.status(200).send(response);
    });
  },

  read: function(req, res, next) {
    Unit.find(req.query, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        res.status(200).send(response)
      }
    });
  },

};
