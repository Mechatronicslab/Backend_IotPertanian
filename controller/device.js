const userModel = require('../model/user')
const deviceModel = require('../model/device')
const activationDeviceModel = require('../model/deviceActivation')
const response = require('../config/response')
const ObjectId = require('mongoose').Types.ObjectId

exports.registrasi = (data) =>
  new Promise((resolve, reject) => {
    deviceModel.create(data)
      .then(() => resolve(response.suksesResponse('Berhasil Registrasi Device')))
      .catch(() => reject(response.errorResponse('Gagal Registrasi Device')))
  })

exports.aktivasiDevice = (data) =>
  new Promise((resolve, reject) => {
    deviceModel.findOneAndDelete({
      mac:data.mac
    }).then(device => {
      if (device) {
        delete device.__v
        let deviceActivation = {
          mac: device.mac,
          devices_name:device.devicename,
          devices_code:data.deviceCode,
          guid: data.guid_id,
          devices_type:device.devicetype,
          devices_registration_date: device.devices_registration_date
        }
        activationDeviceModel.create(deviceActivation)
          .then(() => {
            userModel.updateOne({
                _id: ObjectId(data.userId)
              },
              {
                $push: {
                  devices: deviceActivation
                }
              }).then(() => {
                resolve(response.suksesResponse('Berhasil'))
              }).catch((err) => {
                reject(response.errorResponse('Terjadi Kesalahan Pada Server'))
              })
          }).catch(err => {
            reject(response.errorResponse('Terjadi Kesalahan Pada Server'))
          })
      } else {
        reject(response.errorResponse('Mac Address Tidak Terdaftar'))
      }
    })
  })
  exports.tambahZona = (data) =>
  new Promise((resolve, reject) => {
    userModel.updateOne({
      email: data.email,
      "devices.mac": data.mac
    },
    {
      $push: {
        "devices.$.zona": {
                zona_name: data.zona_name,
                zona_number: data.zona_number,
                jadwal: []
              }
      }
    }).then(() => {
      resolve(response.suksesResponse('Berhasil Nambah Zona'))
    }).catch(() => {
      reject(response.errorResponse('Gagal Menambah Zona'))
    })
  })
  exports.getZonaByDevices = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      email: data.email,
      "devices.mac": data.mac 
    },
    {
      'devices.zone.$': 1
    }).then((result) => {
      if (result) {
        if (result.devices.length < 1) {
          reject(response.nullResult())
        } else {
          resolve(response.suksesResult(result.devices[0].zona))
        }
      } else {
        reject(response.nullResult())
      }
    }).catch(() => {
      reject(response.errorResult())
    })
  })