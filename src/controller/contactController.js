const Contact = require('../models/contactModel');

exports.index = (req, res) => {
    res.render('contact')
}

exports.register = async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.register()

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            return req.session.save(() => res.redirect('back'));
        }

        req.flash('success', "Contado salvo");
        req.session.save(() => res.redirect('back'));
        return;
    }catch(e){
        console.log(e);
        res.render('error')
    }
    
}