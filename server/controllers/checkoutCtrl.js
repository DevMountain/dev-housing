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
      Checkout.find(req.query, function(err, response) {
          if (req.user.role === 'admin') {
              if (err) {
                  res.status(500).send(err)
              } else {
                  res.status(200).send(response);
              };
          };
      });
      if (req.user.role === 'student') {
          req.query.cohort = req.user.cohortID;
          Checkout.find(req.query).populate("checkinAppointments").exec(function(err, response) {
              if (err) {
                  res.status(500).send(err)
              } else {
                  console.log("Found right Cohort to show");
                  res.status(200).json(response);
              }
          });
      };
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
