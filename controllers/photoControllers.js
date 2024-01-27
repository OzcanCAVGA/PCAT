const fs = require('fs')
const Photo = require('../models/Photo')

// Tum fotograflari getirme
exports.getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated')
    res.render('index', {
        photos: photos
    });
};

// Tek fotograf getirme
exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('photo', { // yonlendirmek istedigim template dosyam
        photo // template dosyama yollanacak veritabanindaki dosyam
    })
}

// Fotograf yukleme
exports.createPhoto = async (req, res) => {

    if (req.files && req.files.image) { // kullanici siteye fotografli post atiyorsa burasi calisacak
        const uploadDir = 'public/uploads'

        if (!fs.existsSync(uploadDir)) { // uploadDir dizini yoksa onu olusturuyor.
            fs.mkdirSync(uploadDir)
        }
        let uploadedImage = req.files.image
        let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.md5 + uploadedImage.name
        console.log(uploadedImage)

        uploadedImage.mv(uploadPath, async () => {
            await Photo.create({
                ...req.body,
                image: '/uploads/' + uploadedImage.md5 + uploadedImage.name
            })
        })
    }
    else { // kullanici siteye fotografsiz post atmiyorsa burasi calisacak
        await Photo.create({ ...req.body })
    }
    res.redirect('/')
}

// Fotograf guncelleme
exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()

    res.redirect(`/photos/${req.params.id}`)
}

//  Fotograf silme
exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    let deletedImage = __dirname + '/../public' + photo.image
    console.log(deletedImage)
    if (fs.existsSync(deletedImage)) {
        fs.unlinkSync(deletedImage)
    }
    await Photo.findByIdAndDelete(req.params.id)
    res.redirect('/')
}