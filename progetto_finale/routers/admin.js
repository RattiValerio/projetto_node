const express = require('express');
const router = express.Router();
const session = require('express-session');

const Aircraft = require('../models/Aircraft.js');

const validateAdmin = require('../middlewares/validateAdmin.js');
const database = require("../modules/database.js")

router.get('/aircrafts', validateAdmin, async (req,res) => {
    const aircrafts = await database.aircrafts();
    res.render('admin/aircrafts_list', 
    {
        aircrafts: aircrafts
    });
});

router.get('/add-aircraft', validateAdmin, (req, res) => {
    res.render('admin/add_aircraft');
  });

router.post('/add-aircraft', validateAdmin, async (req, res) => {
    const { name, nickname, speed, max_altitude, engine_power, wing_design, payload, price, armament, defense_systems, crew, fuel_capacity, carrier_capable, image_filename } = req.body;

    const newAircraft = new Aircraft({
        name,
        nickname,
        speed,
        max_altitude,
        engine_power,
        wing_design,
        payload,
        price,
        armament: armament.split(','),
        defense_systems: defense_systems.split(','),
        crew,
        fuel_capacity,
        carrier_capable: carrier_capable === 'on',
        radar: {},
        image_filename
    });

    await newAircraft.save();
    res.redirect('/admin/aircrafts');
});

router.post('/delete-aircraft/:id', validateAdmin, async (req, res) => {
    await Aircraft.findByIdAndDelete(req.params.id);
    res.redirect('/admin/aircrafts');
});


router.get('/edit-aircraft/:id', validateAdmin, async (req, res) => {
    const aircraft = await Aircraft.findById(req.params.id);
    if (!aircraft) {
      return res.status(404).send('Aircraft not found');
    }
    res.render('admin/edit_aircraft', { aircraft });
  });

  router.post('/edit-aircraft/:id', validateAdmin, async (req, res) => {
    const { name, nickname, speed, max_altitude, engine_power, wing_design, payload, price, armament, defense_systems, crew, fuel_capacity, carrier_capable, radar, image_filename } = req.body;
  
    await Aircraft.findByIdAndUpdate(req.params.id, {
      name,
      nickname,
      speed,
      max_altitude,
      engine_power,
      wing_design,
      payload,
      price,
      armament: armament.split(','),
      defense_systems: defense_systems.split(','),
      crew,
      fuel_capacity,
      carrier_capable: carrier_capable === 'on',
      radar: radar,
      image_filename
    });

    res.redirect('/admin/aircrafts');
  });  


module.exports = router