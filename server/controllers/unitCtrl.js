var Unit = require('../models/UnitModel.js');
var User = require('../models/UserModel.js')

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

    setCurrentToFuture: function(req, res, next) {
      var currentUsers = req.body.currentUsers;
      var units = req.body.units;
      var futureUsers = req.body.futureUsers;

      var currentUsersASyncLoop = function(arr, i) {
        if (i >= arr.length -1) {
          console.log('first loop end');
          currentUsersLoopEnd();
        }
        User.findByIdAndUpdate(arr[i]._id, arr[i], function(err, response) {
          if (err) return res.status(500).send(err);
          if (response) currentUsersASyncLoop(arr, i + 1);
          
        })
      };

      var currentUsersLoopEnd = function() {
        unitsASyncLoop(units, 0)
      };

      var unitsASyncLoop = function(arr, i) {
        if (i >= arr.length -1){
          console.log('second loop end');
          unitsLoopEnd();
        }
        Unit.findByIdAndUpdate(arr[i]._id, arr[i], function(err, response) {
          if (err) return res.status(500).send(err);
          if (response) unitsASyncLoop(arr, i + 1);
        })
      };

      var unitsLoopEnd = function(){
        futureUsersASyncLoop(futureUsers, 0)
      }

      var futureUsersASyncLoop = function(arr, i){
        if (i >= arr.length -1){
          console.log('third loop end');
          futureUsersLoopEnd();
        }
        User.findByIdAndUpdate(arr[i]._id, arr[i], function(err, response) {
          if (err) return res.status(500).send(err);
          if (response) futureUsersASyncLoop(arr, i + 1);
        })
      };

      var futureUsersLoopEnd = function(){
        console.log('i think this shit works now');
      }

      currentUsersASyncLoop(currentUsers, 0);
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
