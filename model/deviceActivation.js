const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceActivationSchema = new Schema({
  mac: { type: String },
  devices_name: { type: String },
  devices_code: { type: String },
  guid:{ type: String },
  devices_registration_date: { type: Date },
  devices_type: { type: String },
  devices_activation_date: { type: Date, default: new Date().toLocaleDateString() }
})
module.exports = mongoose.model('device_aktive', DeviceActivationSchema)