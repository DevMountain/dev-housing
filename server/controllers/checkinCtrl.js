"use strict";

var Checkin = require('../models/CheckinModel.js');

module.exports = {

    create: function(req, res, next) {
        Checkin.create(req.body, function(err, response) {
            if (err) return res.status(500).send(err);
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
        if (req.user.role === 'student' || 'mentor' || 'graduate') {
            // this is to only show check-in times that match the last/most recent cohortID in the array
            req.query.cohort = req.user.cohortID[req.user.cohortID.length - 1];
            Checkin.find(req.query).populate("checkinAppointments.user").exec(function(err, response) {
                if (err) {
                    res.status(500).send(err)
                } else {
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
        Checkin.findById(req.params.id, (err1, response1) => {
            if (err1) {
                res.status(500).send(err1)
            } else {
                for (let i = 0; i < response1.checkinAppointments.length; i++) {
                    if (response1.checkinAppointments[i]._id == req.body._id) {
                        response1.checkinAppointments[i].user = req.user._id;
                        break;
                    }
                }
                response1.save();
                res.status(200).send(response1)
            }
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
