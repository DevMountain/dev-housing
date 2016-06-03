var Checkout = require('../models/CheckoutModel.js');

module.exports = {

  create: function(req, res, next) {
    Checkout.create(req.body, function (err, response) {
      if(err) return res.status(500).send(err);
      console.log("Created new Checkout.");
      res.status(200).send(response);
    });
  },

  read: function(req, res, next) {
    Checkout.find(req.query, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        console.log("Reading Checkout.");
        res.status(200).send(response);
      }
    });
  },

  readById: function(req, res, next) {
    Checkout.findById(req.params.id, function (err, response) {
      if(err) { res.status(500).send(err)
      } else {
        console.log("Reading Checkout by id: ",req.params.id);
        res.send(response)
      }
    });
  },

  update: function(req, res, next) {
    Checkout.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      if(err) {res.status(500).send(err)
      } else {
        console.log("Updated Checkout.");
      res.status(200).send(response);
    }
    });
  },

  delete: function(req, res, next) {
    Checkout.findByIdAndRemove(req.params.id, function (err, response) {
      if(err) {
        res.status(500).send(err)
      } else {
          console.log('Deleted Checkout');
          res.send(response)
      }
    });
  }

};
