const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    mac: { type: String },
    kondisi_tanah: { type: String },
    tegangan_tanah: { type: String }
})

module.exports = mongoose.model('history_soil', HistorySchema)
