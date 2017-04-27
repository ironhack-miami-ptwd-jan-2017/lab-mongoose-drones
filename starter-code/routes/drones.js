const express = require('express');

const Drone = require('../models/drone-model.js');

const router = express.Router();


router.get('/drones', (req, res, next) => {
  Drone.find((err, dronesList) => {
    if (err) {
      next(err);
      return;
    }

    res.render('drones/drones-list-view.ejs', {
      drones: dronesList
    });
  });
});


router.get('/drones/new', (req, res, next) => {
  res.render('drones/new-drone-view.ejs');
});

router.post('/drones', (req, res, next) => {
  const theDrone = new Drone({
    droneName: req.body.droneName,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  });

  theDrone.save((err) => {
    if (err) {
      next(err);
      return;
    }

    res.redirect('/drones');
  });
});


module.exports = router;
