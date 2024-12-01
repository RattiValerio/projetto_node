const mongoose = require('mongoose');

const radarSchema = new mongoose.Schema({
    type: String,
    range: String,
    frequency: String,
    capabilities: Array
});

const aircraftSchema = new mongoose.Schema({
    name: String,
    nickname: String,
    speed: String,
    max_altitude: String,
    engine_power: String,
    wing_design: String,
    payload: String,
    price: String,
    armament: Array,
    defense_systems: Array,
    crew: String,
    fuel_capacity: String,
    carrier_capable: Boolean,
    radar: radarSchema,
    image_filename: String,
    
});

const Aircraft = mongoose.model('Aircraft', aircraftSchema);

module.exports = Aircraft;
