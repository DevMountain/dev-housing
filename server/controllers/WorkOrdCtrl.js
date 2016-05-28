var Workorders = require('../models/workorders.js');

module.exports = {

  create: function(req, res, next) {
    Workorders.create(req.body, function(err, results) {
      console.log("reaching WO create before er");
      if(err) return res.status(500).send(err);
      var newWorkOrder = new Workorders(req.body);
      newWorkOrder.save(function(err, response) {
        if(err) {
          res.status(500).json(err)
        } else {
          console.log('Creating new work order.');
          res.json(response)
        }
      });
    });
  },

  read: function(req, res, next) {
    Workorders.find(req.query, function (err, response) {
      console.log("reaching WO read before err");
      if(err) { res.status(500).json(err)
      } else {
        console.log("Getting work orders to read.");
        res.json(response)
      }
    });
  },

  readById: function(req, res, next) {
    Workorders.findById(req.params.id, function (err, response) {
      console.log('reaching WO readById before err');
      if(err) { res.status(500).json(err)
      } else {
        console.log("reading by id: ", res.json(response));
        res.json(response)
      }
    });
  },

  update: function(req, res, next) {
    Workorders.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
      console.log('reaching WO update before err');
      if(err) {res.status(500).json(err)
      } else {
      res.status(200).send('Work Order updated');
    }
    });
  },

  delete: function(req, res, next) {
    Workorders.findByIdandRemove(req.params.id, function (err, response) {
      console.log('reaching WO delete before err');
      if(err) {
        res.status(500).json(err)
      } else {
          console.log('Deleted Work Order');
          res.json(response)
      }
    });
  }

};
