const router = require('express').Router()
const deviceController = require('../controller/device')

router.post('/register', (req, res) => {
  deviceController.registrasi(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.post('/aktivasi', (req, res) => {
  deviceController.aktivasiDevice(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
router.post('/tambahzona', (req, res) => {
  deviceController.tambahZona(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
router.post('/getzonabydevices', (req, res) => {
  deviceController.getZonaByDevices(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
module.exports = router