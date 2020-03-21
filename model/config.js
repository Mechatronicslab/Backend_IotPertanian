const mongoose = require('mongoose')

const ConfigSchema = new mongoose.Schema({
    mac_actuator: { type: String },
    mac_sensor: { type: String },
    value_off: { type: String },
    value_on: { type: String },
    guid: { type: String },
    devices_name: { type: String }
})
module.exports = mongoose.model('config', ConfigSchema)