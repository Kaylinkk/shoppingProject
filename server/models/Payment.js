const { Schema } = require('mongoose');
const mongoose = require('mongoose');


const paymentSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
}, { timestamps: true }) //자동으로 등록시간저장가능





const Payment = mongoose.model('Payment', paymentSchema);
module.exports = { Payment }