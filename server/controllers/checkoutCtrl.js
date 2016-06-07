"use strict";

var Checkout = require('../models/CheckoutModel.js');

module.exports = {

    create: function(req, res, next) {
        Checkout.create(req.body, function(err, response) {
            if (err) return res.status(500).send(err);
            res.status(200).send(response);
        });
    },

    read: function(req, res, next) {
        Checkout.find(req.query).populate("checkoutAppointments.user").exec(function(err, response) {
            if (req.user.role === 'admin') {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).send(response);
                };
            };
        });
        if (req.user.role === 'student' || req.user.role === 'mentor' || req.user.role === 'graduate') {
            // this is to only show check-in times that match the last/most recent cohortID in the array
            req.query.cohort = req.user.cohortID[req.user.cohortID.length - 1];
            Checkout.find(req.query).populate("checkoutAppointments.user").exec(function(err, response) {
                if (err) {
                    res.status(500).send(err)
                } else {
                    res.status(200).json(response);
                }
            });
        };
    },

    readById: function(req, res, next) {
        Checkout.findById(req.params.id, function(err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                console.log("Reading Checkout by id: ", req.params.id);
                res.send(response)
            }
        });
    },

    update: function(req, res, next) {
        Checkout.findById(req.params.id, (err1, response1) => {
            if (err1) {
                res.status(500).send(err1)
            } else {
                for (let i = 0; i < response1.checkoutAppointments.length; i++) {
                    if (response1.checkoutAppointments[i]._id == req.body._id) {
                        response1.checkoutAppointments[i].user = req.user._id;
                        break;
                    }
                }
                response1.save();
                res.status(200).send(response1)
            }
        })
    },

    delete: function(req, res, next) {
        Checkout.findByIdAndRemove(req.params.id, function(err, response) {
            if (err) {
                res.status(500).send(err)
            } else {
                console.log('Deleted Checkout');
                res.send(response)
            }
        });
    }

};
