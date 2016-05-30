var Workorders = require('../models/workorders.js');

module.exports = {

  create: function(req, res, next) {
    Workorders.create(req.body, function (err, response) {
      if(err) return res.status(500).send(err);
      newWorkOrder = response.toObject();
      console.log("Created workorder.");
      res.status(200).json(newWorkOrder);
    });
  },

  read: function(req, res, next) {
    Workorders.find(req.query, function (err, response) {
      if(err) { res.status(500).json(err)
      } else {
        console.log("Getting work orders to read.");
        res.json(response)
      }
    });
  },

  readById: function(req, res, next) {
    Workorders.findById(req.params.id, function (err, response) {
      if(err) { res.status(500).json(err)
      } else {
        console.log("reading by id: ",req.params.id);
        res.json(response)
      }
    });
  },

  update: function(req, res, next) {
    Workorders.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if(err) {res.status(500).json(err)
      } else {
        console.log("Updated work order.");
      res.status(200).send(response);
    }
    });
  },

  delete: function(req, res, next) {
    Workorders.findByIdAndRemove(req.params.id, function (err, response) {
      if(err) {
        res.status(500).json(err)
      } else {
          console.log('Deleted Work Order');
          res.json(response)
      }
    });
  }

};
