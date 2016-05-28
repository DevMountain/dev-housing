var WorkOrders = require('../models/workorders.js');

module.exports = {

  create: function(req, res, next) {
    WorkOrders.create(req.body, function(err, results) {
      if(err) return res.status(500).send(err);
      newWorkOrders = result.toObject();
      console.log('Creating new work order.');
      res.status(200).json(newUser);
    });
  },

  read: function(req, res, next) {
    WorkOrders.find(req.query, function (err, response) {
      if(err) { res.status(500).json(err)
      } else {
        console.log("Getting work orders to read.");
        res.json(response)
      }
    });
  },

  readById: function(req, res, next) {
    WorkOrders.findById(req.params.id, function (err, response) {
      if(err) { res.status(500).json(err)
      } else {
        res.json(response)
      }
    });
  },

  update: function(req, res, next) {
    WorkOrders.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
      if(err) {res.status(500).json(err)
      } else {
      res.status(200).send('Work Order updated');
    }
    });
  },

  delete: function(req, res, next) {
    WorkOrders.findByIdandRemove(req.params.id, function (err, response) {
      if(err) {
        res.status(500).json(err)
      } else {
          console.log('Deleted Work Order');
          res.json(response)
      }
    });
  }

};
