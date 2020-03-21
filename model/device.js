const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DeviceSchema = new Schema({
  mac: { type: String },
  devicename: { type: String },
  devicetype: { type: String },
  devicecode: { type: String },
  devices_registration_date: { type: Date, default: Date().toLocaleString() }
})
module.exports = mongoose.model('device', DeviceSchema)