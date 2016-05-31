var CheckInOut = require('../models/CheckinoutModel.js');

module.exports = {

  create: function(req, res, next) {
    CheckInOut.create(req.body, function (err, response) {
      if(err) return res.status(500).send(err);
      console.log("Created new CheckInOut.");
      res.status(200).send(response);
    });
  },

  read: function(req, res, next) {
    CheckInOut.find(req.query, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        console.log("Reading CheckInOut.");
        res.status(200).send(response);
      }
    });
  },

  readById: function(req, res, next) {
    CheckInOut.findById(req.params.id, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        console.log("Reading CheckInOut by id: ",req.params.id);
        res.send(response)
      }
    });
  },

  update: function(req, res, next) {
    CheckInOut.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if(err) {res.status(500).send(err)
      } else {
        console.log("Updated CheckInOut.");
      res.status(200).send(response);
    }
    });
  },

  delete: function(req, res, next) {
    CheckInOut.findByIdAndRemove(req.params.id, function (err, response) {
      if(err) {
        res.status(500).send(err)
      } else {
          console.log('Deleted CheckInOut');
          res.send(response)
      }
    });
  }

};
