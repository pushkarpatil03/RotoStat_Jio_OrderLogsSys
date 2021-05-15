const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Order = require('./models/order');

mongoose.connect('mongodb://localhost:27017/rotostat-orders', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home');
});

app.get('/orders', async (req, res) => {
    const orders = await Order.find({});
    res.render('orders/index', { orders });
});

app.get('/orders/new', (req, res) => {
    res.render('orders/new');
});

app.post('/orders', async (req, res) => {
    const order = new Order(req.body.order);
    await order.save();
    res.redirect(`/orders/${order._id}`)
});

app.get('/orders/:id', async (req, res,) => {
    const order = await Order.findById(req.params.id);
    const orders = await Order.find({});
    res.render('orders/show', { order, orders });
});

app.get('/orders/:id/edit', async (req, res) => {
    const order = await Order.findById(req.params.id);
    res.render('orders/edit', { order });
});

app.put('/orders/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, { ...req.body.order });
    res.redirect(`/orders/${order._id}`)
});
/* 
app.get('/orders/new', (req, res) => {
    res.render('orders/new');
})

app.post('/orders', async (req, res) => {
    const order = new Order(req.body.order);
    await order.save();
    res.redirect(`/orders/${order._id}`)
})

app.get('/orders/:id', async (req, res,) => {
    const order = await Order.findById(req.params.id)
    res.render('orders/show', { order });
});

app.get('/orders/:id/edit', async (req, res) => {
    const order = await Order.findById(req.params.id)
    res.render('orders/edit', { order });
})

app.put('/orders/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, { ...req.body.order });
    res.redirect(`/orders/${order._id}`)
});

app.delete('/orders/:id', async (req, res) => {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.redirect('/orders');
})
 */


app.listen(3000, () => {
    console.log('Serving on port 3000')
})