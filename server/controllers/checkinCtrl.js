"use strict";

var Checkin = require('../models/CheckinModel.js');
// var _ = require('underscore');


module.exports = {

    create: function(req, res, next) {
        Checkin.create(req.body, function(err, response) {
            if (err) return res.status(500).send(err);
            console.log("Created new Checkin.");
            res.status(200).send(response);
        });
    },


    read: function(req, res, next) {
        Checkin.find(req.query).populate("checkinAppointments.user").exec(function(err, response) {
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
            Checkin.find(req.query).populate("checkinAppointments.user").exec(function(err, response) {
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
        Checkin.findById(req.params.id, function(err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                console.log("Reading Checkin by id: ", req.params.id);
                res.send(response)
            }
        });
    },

    update: function(req, res, next) {
console.log(`the whole params: ${JSON.stringify(req.params.id)}`);
console.log(`the whole body: ${JSON.stringify(req.body._id)}`);
console.log(req.user._id);

          Checkin.findById(req.params.id, (err1, response1) => {
            if (err1) {
              console.log(`first error: ${err1}`);
              res.status(500).send(err1)
            } else {
              console.log(response1.checkinAppointments);

              // var appt = _.findWhere(response1.checkinAppointments, {_id: mongoose.Types.ObjectId(req.body._id)});
              for (let i=0;i<response1.checkinAppointments.length;i++){
                console.log(response1.checkinAppointments[i]._id, req.body._id);
                if (response1.checkinAppointments[i]._id==req.body._id){
                  response1.checkinAppointments[i].user= req.user._id;
                  break;
                }
              }

              response1.save();
            }

          //End of this function
          })

    },

    delete: function(req, res, next) {
        Checkin.findByIdAndRemove(req.params.id, function(err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                console.log('Deleted Checkin');
                res.send(response)
            }
        });
    }

};
