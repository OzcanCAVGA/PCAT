const Photo = require('../models/Photo')
// About sayfasina iletir
exports.getAboutPage = (req, res) => {
    res.render('about')
}

// Sayfa eklemeye iletir
exports.getAddPage = (req, res) => {
    res.render('add')
}

exports.getEditPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id })
    res.render('edit', {
        photo
    })
}