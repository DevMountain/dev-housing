var Checkin = require('../models/CheckinModel.js');

module.exports = {

  create: function(req, res, next) {
    Checkin.create(req.body, function (err, response) {
      if(err) return res.status(500).send(err);
      console.log("Created new Checkin.");
      res.status(200).send(response);
    });
  },

  read: function(req, res, next) {
    Checkin.find(req.query, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        console.log("Reading Checkin.");
        res.status(200).send(response);
      }
    });
  },

  readById: function(req, res, next) {
    Checkin.findById(req.params.id, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        console.log("Reading Checkin by id: ",req.params.id);
        res.send(response)
      }
    });
  },

  update: function(req, res, next) {
    Checkin.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if(err) {res.status(500).send(err)
      } else {
        console.log("Updated Checkin.");
      res.status(200).send(response);
    }
    });
  },

  delete: function(req, res, next) {
    Checkin.findByIdAndRemove(req.params.id, function (err, response) {
      if(err) {
        res.status(500).send(err)
      } else {
          console.log('Deleted Checkin');
          res.send(response)
      }
    });
  }

};
