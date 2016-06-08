var Workorder = require('../models/WorkorderModel.js');
var Unit = require('../models/UnitModel.js');

module.exports = {

  create: function(req, res1, next) {

      // Unit.find(req.query)
      //     .populate('currentBedrooms.currentOccupants', '-password')
      //     .populate('allCurrentOccupants', '-password')
      //     .exec(function(err, res2) {
      //       if (err) {
      //           res1.status(500).send(err);
      //       } else {
      //         var bb8 = res2;
      //         //Put workorder.create function in the else.
      //       }
      //     });
  
              Workorder.create(req.body, function(err, response) {
                console.log(`Getting units info: ${bb8}`);
                  if (err) return res1.status(500).send(err);
                  console.log("Created workorder.");
                  res1.status(200).send(response);
              });
    },

    read: function(req, res, next) {
        if (req.user.role === 'admin') {
            Workorder.find(req.query)
              .populate("submittedBy")
              .exec(function(err, response) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send(response);
                };
            });
        };
        if (req.user.role === 'student' || req.user.role === 'mentor' || req.user.role === 'graduate') {
          req.query.submittedBy = req.user;
            Workorder.find(req.query)
            .populate("submittedBy")
            .exec(function(err, response) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    console.log(`Reading units now: ${response.unit}`);
                    res.status(200).json(response);
                }
            });
        }

    },

    readById: function(req, res, next) {
        Workorder.findById(req.params.id, function(err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                console.log("reading by id: ", req.params.id);
                res.send(response)
            }
        });
    },

    update: function(req, res, next) {
        console.log(`backend CTRL: ${req.params.id}`);
        Workorder.findByIdAndUpdate(req.params.id, req.body, function(err, response) {
            console.log(`backend CTRL: ${err}`);
            if (err) {
                res.status(500).send(err)
            } else {
                console.log("Updated work order.");
                res.status(200).send(response);
            }
        });
    },

    delete: function(req, res, next) {
        Workorder.findByIdAndRemove(req.params.id, function(err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                console.log('Deleted Work Order');
                res.send(response)
            }
        });
    }

};
