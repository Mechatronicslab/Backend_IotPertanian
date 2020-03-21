const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  guid: { type: String },
  no_ktp: { type: Number },
  nama: { type: String },
  no_hp: { type: Number },
  email: { type: String, required: true },
  alamat: { type: String },
  password: { type: String },
  // user_location: {
  latitude: { type: String },
  longitude: { type: String },
  // },
  devices: [{
    mac: { type: String },
    devices_name: { type: String },
    devices_code: { type: String },
    latitude: { type: String },
    longitude: { type: String },
    value: [{
      sensor: { type: String },
      tanggal: { type: String },
    }],
    device_type: { type: String },
    devices_registration_date: { type: Date },
    devices_activation_date: { type: Date, default: new Date().toLocaleDateString() },
  }]
})

module.exports = mongoose.model('user', UserSchema)