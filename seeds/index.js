const mongoose = require('mongoose');
const Order = require('../models/order');
const orders = require('./orders');


mongoose.connect('mongodb://localhost:27017/rotostat-orders', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Database connected");   // we're connected!
});

const seedDB = async () => {
    await Order.deleteMany({});
    for (let i=0; i<11; i++) {
        const odetails = new Order({
            InvoiceNum: `${orders[i].invoice_no}`,     //NR (Not required when order is rejected)
            PostingDate: `${orders[i].posting_date}`,
            MatName: `${orders[i].mat_name}`,
            MatCode: `${orders[i].mat_code}`,
            MatDesc: `${orders[i].mat_desc}`,
            Circle: `${orders[i].circle}`,              //NR
            RecQuan: `${orders[i].rec_quantity}`,
            AccQuan: `${orders[i].acc_quantity}`,       //NR
            RejectQuan: `${orders[i].rej_quantity}`,    //NR
            Status: `${orders[i].status}`,
            PO: `${orders[i].po}`,                      //NR ....when rej
            VendorCode: `${orders[i].vendor_code}`,
            VendorName: `${orders[i].vendor_name}`,
            Ref: `${orders[i].ref}`,                    //NR
            Remarks: `${orders[i].remarks}`,            //NR
        })
        await odetails.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})
