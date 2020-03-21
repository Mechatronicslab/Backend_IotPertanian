const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    mac: { type: String },
    level_air: { type: String },
    data: [{ type: String }]
})

module.exports = mongoose.model('history_waterlev', HistorySchema)