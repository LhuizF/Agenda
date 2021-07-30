const Contact = require('../models/contactModel');

exports.index = (req, res) => {
    res.render('contact', {
        contact: {}
    })
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
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return;

    }catch(e){
        console.log(e);
        res.render('error')
    }
}

exports.editContact = async (req, res) =>{
    if(!req.params.id) return res.render('error');

    const contact = await Contact.searchId(req.params.id);
    if(!contact)  return res.render('error');

    res.render('contact', { contact });
}

exports.edit = async (req, res) =>{
    try{
        if(!req.params.id) return res.render('error');
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);
    
        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors);
            return req.session.save(() => res.redirect('back'));
        }
    
        req.flash('success', "Contado atualizado com sucesso");
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`));
        return;

    }catch(e){
        console.log(e);
        res.render('error');
    }

}

exports.delete = async (req, res) =>{
    if(!req.params.id) return res.render('error');

    const contact = await Contact.deleteId(req.params.id);
    if(!contact)  return res.render('error');

    req.flash('success', "Contado apagado com sucesso");
    req.session.save(() => res.redirect('back'));
}