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
            });
    },

    setCurrentToFuture: function(request, response, next) {
        Unit.findByIdAndUpdate(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).send(error);
            }
            else {
                // TODO for loop to update students housing properties 
                console.log('Updating ' + request.params.id);
                response.status(200).send(serverResponse);
            }
        });
    },

    addUserToUnitCurrent: function(req, res, next) {
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
        });
    },

    removeUserFromUnitCurrent: function(req, res, next) {
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
      });
    },

    addUserToUnitFuture: function(req, res, next) {
        Unit.findOneAndUpdate({
            'futureBedrooms._id': req.params.id
        }, {
            $addToSet: {
                'futureBedrooms.$.futureOccupants': req.body._id
            }, $push: {
              'allFutureOccupants': req.body._id
            }
        }).populate('futureBedrooms.futureOccupants').exec(function(err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log(response);
                res.send(response);
            }
        });
    },

    removeUserFromUnitFuture: function(req, res, next) {
      Unit.findOneAndUpdate({
          'futureBedrooms._id': req.params.id
      }, {
          $pull: {'futureBedrooms.$.futureOccupants': req.body._id,
          allFutureOccupants: req.body._id}
      }).populate('futureBedrooms.futureOccupants').exec(function(err, response) {
          if (err) {
            console.log(err);
              res.status(500).send(err);
          } else {
              console.log(response);
              res.send(response);
          }
      });

    },


};
