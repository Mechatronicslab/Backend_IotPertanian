const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    jenis_device: { type: String },
    mac: { type: String },
    data: { type: Number }
})

module.exports = mongoose.model('history_waterflow', HistorySchema)
