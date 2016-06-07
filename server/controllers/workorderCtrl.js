var Workorder = require('../models/WorkorderModel.js');

module.exports = {

  create: function(req, res, next) {
    Workorder.create(req.body, function (err, response) {
      console.log('*_*_*_*_*: backend CTRL: ' + req.body.description);
      if(err) return res.status(500).send(err);
      console.log("Created workorder.");
      res.status(200).send(response);
    });
  },

  read: function(req, res, next) {
    Workorder.find(req.query, function (err, response) {
      if (req.user.role === 'admin') {
      if(err) { res.status(500).send(err)
      } else {
        console.log(`Getting work orders for Admin to read. ${response}`);
        res.status(200).send(response);
      };
    };
    if (req.user.role === 'student' || req.user.role === 'mentor' || req.user.role === 'graduate') {
      if (err) {
        res.status(500).send(err)
      } else {
        console.log(`User thats reading this is: ${req.user._id}`);
        console.log(JSON.stringify(req.query));
        console.log(`User thats reading this is: ${response.submittedBy}`);
        req.query.submittedBy = req.user._id;
        // console.log(`Reading work order for Stud/ment/grad to read.${response}`);
        res.status(200).json(response);
      }
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
    console.log(`backend CTRL: ${req.params.id}`);
    Workorder.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
      console.log(`backend CTRL: ${err}`);
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
