const router = require('express').Router()
const userModel = require('../model/user')
const deviceModel = require('../model/device')
const fs = require('fs')
const Soil = require('../model/Soil')
const Waterflow = require('../model/Waterflow')
const Waterlev = require('../model/Waterlev')
const Zona = require('../model/Zona')
const Config = require('../model/config.js')
const DeviceActivation = require('../model/deviceActivation')

//Router untuk ambil data zona dari database sesuai mac address
router.post('/getZona', async (req, res) => {
    try {
        const device = await Zona.find({ mac: req.body.mac })
        if (device.length == 0) {
            res.status(404).json({ status: "Mac Tidak Terdaftar" })
        }
        else {
            res.status(200).json({status:"true",device})
        }
    } catch (err) {
        res.status(500).json({ status: "false",device})
    }
})

//Router untuk ambil data sensor soil sesuai mac address
router.post('/soil', async (req, res) => {
    try {
        const soil = await Soil.find({ mac: req.body.mac })
        if (soil.length == 0) {
            res.status(404).json({ status: "Mac Tidak Terdaftar",soil})
        }
        else {
            res.status(200).json(soil)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Router untuk ambil data sensor waterlevel sesuai mac address
router.post('/waterlev', async (req, res) => {
    const waterlev = await Waterlev.find({ mac: req.body.mac })
    if (waterlev.length == 0) {
        res.status(404).json({ status: "Mac Tidak Terdaftar" })
    }
    else {
        res.status(200).json(waterlev)
    }
})

//Router untuk ambil data sensor waterflow sesuai mac address
router.post('/waterflow', async (req, res) => {
    try {
        const waterflow = await Waterflow.find({ mac: req.body.mac })
        if (waterflow.length == 0) {
            res.status(404).json({ status: "Mac Tidak Terdaftar" })
        }
        else {
            res.status(200).json(waterflow)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Router untuk ambil data device sesuai mac address
router.post('/findMac', async (req, res) => {
    try {
        const device = await deviceModel.find({ mac: req.body.mac })

        if (device.length == 0) {
            res.status(404).json({ status: "Mac Tidak Terdaftar" })
        }
        else {
            res.status(200).json(device)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

//Router untuk ambil device dari database di dalam user yang sudah login
router.post('/userLogin', async (req, res) => {
    var post = req.body;
    var user = await userModel.find({ email: post.email })
    console.log(user)
    if (user.length == 0) {
        res.status(404).json({ status: "false" })
    }
    else {
        try {
            json = {
                user
            }
            json = JSON.stringify(json)
            await fs.writeFile('./bassing.json', json, (err) => {
                if (!err) {
                    fs.readFile('./bassing.json', (err, json) => {
                        pertanian = JSON.parse(json)
                        for (i in pertanian.user) {
                            device = pertanian.user[i].devices
                            console.log(device)
                            res.status(200).json({ status: true, device })
                        }
                    })
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
})

//Router untuk tambah zona ke dalam database
router.post('/zona', async (req, res, next) => {
    const zona = new Zona({
        mac: req.body.mac,
        zona: [{
            zona_number: req.body.zona_number,
            zona_name: req.body.zona_name,
            Seconds_duration: req.body.Seconds_duration,
            foto: req.body.foto
        }]
    })
    const baru = {
        zona_number: req.body.zona_number,
        zona_name: req.body.zona_name,
        Seconds_duration: req.body.Seconds_duration,
        foto: req.body.foto
    }
    try {
        const newZona = await Zona.find({ mac: req.body.mac })
        if (newZona.length == 0) {
            const newZona = await zona.save()
            res.status(200).json(newZona)
        }
        else {
            Zona.updateOne(
                { mac: req.body.mac },
                {
                    $push: { zona: baru }
                },
                function (error, zona) {
                    //jika error, tampilkan  di error di console
                    if (error) {
                        console.log(error)
                    }
                    //jika berhasil, tampilkan message tambah berhasil ke user
                    else {
                        console.log(zona)
                        return res.status(201).json({ message: "Tambah Berhasil" })
                    }
                }
            )
        }
    } catch (err) {
        res.status(400).json(err.message)
    }
})
router.post('/addConfig', async (req, res) => {
    const data = new Config({
        mac_actuator: req.body.mac_actuator,
        mac_sensor: req.body.mac_sensor,
        value_off: req.body.value_off,
        value_on: req.body.value_on,
        guid: req.body.guid,
        devices_name: req.body.name
    })
    try {
        const newData = await data.save()
        res.status(201).json({msg:"Berhasil",newData})
    }
    //jika error, tampilkan error message
    catch (err) {
        res.status(400).json(err.message)
    }
})

router.post('/getConfig', async (req, res) => {
    try {
        const config = await Config.find({ mac: req.body.mac })
        if (config.length == 0) {
            res.status(404).json({ message: "Mac Tidak terdaftar" })
        } else {
            res.status(200).json(config)
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.post('/getAct', async (req, res) => {
    try {
        const  deviceActivation = await DeviceActivation.find({ guid: req.body.guid,devices_type:req.body.devices_type})
        if (deviceActivation.length == 0) {
            res.status(404).json({ status: "false",deviceActivation })
        } else {
            res.status(200).json({status:"true",deviceActivation})
        }
    } catch (err) {
        res.status(500).json({ status: err.status })
    }
})








module.exports = router
// history_waterflows 