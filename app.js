const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/contactForm');

const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params)
})
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params)
})
app.post('/contact', async(req, res) => {
    var myData = await new Contact(req.body);
    myData.save().then(() => {
        res.send("This data has been saved");
    }).catch(() => {
        res.status(400).send("This data was not saved");
    })
})

app.listen(port, () => {
    console.log(`The application has started successfully on port ${port}`);
})