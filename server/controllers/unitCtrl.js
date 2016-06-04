var Unit = require('../models/UnitModel.js');

module.exports = {

    create: function(req, res, next) {
        Unit.create(req.body, function(err, response) {
            if (err) return res.status(500).send(err);
            res.status(200).send(response);
        });
    },

    read: function(req, res, next) {
        Unit.find(req.query)
            .populate('currentBedrooms.currentOccupants', '-password')
            .populate('futureBedrooms.futureOccupants', '-password')
            .populate('allCurrentOccupants', '-password')
            .exec(function(err, response) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send(response);
                }
            })
    },

    addUserToUnit: function(req, res, next) {
        Unit.findOneAndUpdate({
            'currentBedrooms._id': req.params.id
        }, {
            $addToSet: {
                'currentBedrooms.$.currentOccupants': req.body._id
            }, $push: {
              'allCurrentOccupants': req.body._id
            }
        }).populate('currentBedrooms.currentOccupants').exec(function(err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(response);
                res.send(response);
            }
        })
    },

    removeUserFromUnit: function(req, res, next) {
      Unit.findOneAndUpdate({
          'currentBedrooms._id': req.params.id
      }, {
          $pull: {'currentBedrooms.$.currentOccupants': req.body._id,
          allCurrentOccupants: req.body._id}
      }).populate('currentBedrooms.currentOccupants').exec(function(err, response) {
          if (err) {
            console.log(err);
              res.status(500).send(err);
          } else {
              console.log(response);
              res.send(response);
          }
      })

    },
}
