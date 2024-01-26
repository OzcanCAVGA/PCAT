const express = require('express');
const mongoose = require('mongoose')
const path = require("path")
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

//connect DB
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db');
}



//TEMPLATE ENGINE
app.set("view engine", "ejs")


//MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })) // HTML form bicimindeki verileri islemek icin kullaniyoruz.
app.use(express.json()) // JSON verilerini islemek icin kullaniyoruz.


//ROUTES
app.get("/", async (req, res) => {
    const photos = await Photo.find({})
    res.render('index', {
        photos: photos
    })
})

app.get("/photos/:id",async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo',{ // yonlendirmek istedigim template dosyam
        photo // template dosyama yollanacak veritabanindaki dosyam
    })
})

app.get("/about", (req, res) => {
    res.render('about')
})
app.get('/add', (req, res) => {
    res.render('add')
})

app.post('/photos', async (req, res) => {
    await Photo.create(req.body)
    res.redirect('/') // istekten sonra cevap olarak bu sekilde yazilmali. Yoksa sadece istek olarak kalir.
})



const port = 3000;
app.listen(port, () => {
    console.log(`Sunucumuz ${port} portunda baslatildi.`)
})