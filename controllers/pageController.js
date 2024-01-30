const Photo = require('../models/Photo')
// About sayfasina iletir
exports.getAboutPage = (req, res) => {
    res.render('about')
}

// Sayfa eklemeye goturur
exports.getAddPage = (req, res) => {
    res.render('add')
}

//Sayfa duzenlemeye goturur
exports.getEditPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    res.render('edit', {
        photo
    })
}