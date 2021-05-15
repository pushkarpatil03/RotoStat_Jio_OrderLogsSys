const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    InvoiceNum: {
        type: Number
    },
    PostingDate: String,
    MatName: {
        type: String,
        required: true
    },
    MatCode: Number,
    MatDesc: {
        type: String,
        required: true
    },
    Circle: String,
    RecQuan: {
        type: Number,
        min: 0,
        required: true
    },
    AccQuan: {
        type: Number
    },
    RejectQuan: {
        type: Number
    },
    Status: String,
    PO: {
        type: Number
    },
    VendorCode: {
        type: Number
    },
    VendorName: {
        type: String,
        required: true
    },
    Ref: String,
    Remarks: String
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;