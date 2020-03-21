const adminModel = require('../model/admin')
const response = require('../config/response')
const bcrypt = require('bcrypt')


exports.register = (data) =>
  new Promise((resolve, reject) =>{
    adminModel.findOne({
      username: data.username
    }).then((admin) => {
      if (admin) {
        reject(response.errorResponse('Username Sudah Digunakan'))
      } else {
        bcrypt.hash(data.password, 10 , (err, hash) => {
          data.password = hash
          .create(data)
            .then(() => {
              resolve(response.suksesResponse('Berhasil Registrasi'))
            }).catch(() => {
              reject(response.errorResponse('Gagal Registrasi'))
            })
        })
      }
    })
  })

exports.loginadmin = (data) =>
  new Promise((resolve, reject) => {
    adminModel.findOne({
      username: data.username
    }).then(admin => {
      if (admin) {
        if (bcrypt.compareSync(data.password, admin.password)) {
          resolve(Object.assign(response.suksesResponse('Berhasil Login'), {
            admin: admin
          }))
        } else {
          reject(response.errorResponse('Password Salah'))
        }
      } else {
        reject(response.errorResponse('Username Tidak Terdaftar'))
      }
    })
  })