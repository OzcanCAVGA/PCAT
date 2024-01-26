const express = require('express');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const path = require("path")
const fs = require('fs')
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
app.use(fileUpload())
app.use(methodOverride('_method'));


//ROUTES
app.get("/", async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render('index', {
        photos: photos
    })
})

app.get("/photos/:id", async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo', { // yonlendirmek istedigim template dosyam
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

    const uploadDir = 'public/uploads'

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir)
    }


    let uploadedImage = req.files.image
    let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name
        })
        res.redirect('/')
    })
})

app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    res.render('edit', {
        photo
    })
})

app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()

    res.redirect(`/photos/${req.params.id}`)
})

const port = 3000;
app.listen(port, () => {
    console.log(`Sunucumuz ${port} portunda baslatildi.`)
})