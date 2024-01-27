const express = require('express');
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const ejs = require('ejs');
const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageController')
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
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));


//ROUTES
app.get("/", photoController.getAllPhotos)
app.get("/photos/:id", photoController.getPhoto)
app.post('/photos', photoController.createPhoto)
app.put('/photos/:id', photoController.updatePhoto)
app.delete('/photos/:id', photoController.deletePhoto)

app.get("/about",pageController.getAboutPage)
app.get('/add', pageController.getAddPage)


app.get('/photos/edit/:id', pageController.getEditPage)

const port = 3000;
app.listen(port, () => {
    console.log(`Sunucumuz ${port} portunda baslatildi.`)
})