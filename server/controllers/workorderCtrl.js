var Workorder = require('../models/WorkorderModel.js');

module.exports = {

  create: function(req, res, next) {
    Workorder.create(req.body, function (err, response) {
      if(err) return res.status(500).send(err);
      console.log("Created workorder.");
      res.status(200).send(response);
    });
  },

  read: function(req, res, next) {
    Workorder.find(function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        console.log("Getting work orders to read.");
        res.status(200).send(response);
      }
    });
  },

  readById: function(req, res, next) {
    Workorder.findById(req.params.id, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        console.log("reading by id: ",req.params.id);
        res.send(response)
      }
    });
  },

  update: function(req, res, next) {
    Workorder.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if(err) {res.status(500).send(err)
      } else {
        console.log("Updated work order.");
      res.status(200).send(response);
    }
    });
  },

  delete: function(req, res, next) {
    Workorder.findByIdAndRemove(req.params.id, function (err, response) {
      if(err) {
        res.status(500).send(err)
      } else {
          console.log('Deleted Work Order');
          res.send(response)
      }
    });
  }

};
