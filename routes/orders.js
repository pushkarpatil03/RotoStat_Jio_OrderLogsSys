const express= require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { orderSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const Order = require('../models/order');

const validateOrder = (req, res, next) => {
    const { error } = orderSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const { VendorCode } = req.query;
    if (VendorCode) {
        const orders = await Order.find({ VendorCode });
        res.render('orders/index', { orders, VendorCode });
    } else {
        const orders = await Order.find({});
        res.render('orders/index', { orders, VendorCode: 'All' });
    }
}));

/* router.get('/sort', catchAsync(async (req, res) => {
    res.render('orders/sort');
})); */

router.get('/new', (req, res) => {
    res.render('orders/new');
});

router.post('/', validateOrder, catchAsync(async (req, res, next) => {
    const order = new Order(req.body.order);
    await order.save();
    req.flash('success', 'Successfully made a Order log!');
    res.redirect(`/orders/${order._id}`)
}));

router.get('/:id', catchAsync(async (req, res,) => {
    const order = await Order.findById(req.params.id);
    const orders = await Order.find({});
    if (!order) {
        req.flash('error', 'Cannot find that order!');
        return res.redirect('/orders');
    }
    res.render('orders/show', { order, orders });
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        req.flash('error', 'Cannot find that order!');
        return res.redirect('/orders');
    }
    res.render('orders/edit', { order });
}));

router.put('/:id', validateOrder, catchAsync(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, { ...req.body.order });
    req.flash('success', 'Successfully updated order!');
    res.redirect(`/orders/${order._id}`)
}));

router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted order')
    res.redirect('/orders');
}));

module.exports = router;
