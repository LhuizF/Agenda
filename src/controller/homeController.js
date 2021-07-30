const Contact = require('../models/contactModel');

exports.index = async (req, res) =>{
    const contacts = await Contact.searchContacts();
    res.render('index', { contacts })
};
