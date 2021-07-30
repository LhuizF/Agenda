const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
    name:{type: String, require: true},
    lastName:{type: String, require: false, default: ''},
    email:{type: String, require: false, default: ''},
    telephone:{type: Number, require: false, default: ''},
    createdDate:{type: String, default: () => {
        const now = new Date
        return now.toLocaleDateString() +' ' + now.toLocaleTimeString()
    }}
});

const contactModel = mongoose.model('contact', contactSchema)

class Contact {
    constructor(body){
        this.body = body
        this.errors = [];
        this.contact = null;
    }

    async register(){
        this.valida()

        if(this.errors.length > 0) return;

        this.contact = await contactModel.create(this.body)
    }

    valida(){
        this.cleanUp()

        if(this.body.email && !validator.isEmail(this.body.email)){
            this.addError('E-mail inválido');
        }

        if(!this.body.name) this.addError('O campo nome não pode ser nulo.');

        if(!this.body.email && !this.body.telephone) this.addError('O campo Email ou Telefone deve ser preenchido')

        //if(this.body.telephone === NaN) this.addError('O campo Telefone deve conter somente números')
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            name: this.body.name,
            lastName: this.body.lastName,
            email: this.body.email,
            telephone: this.body.telephone
        }
    }

    addError(msg){
        this.errors.push(msg)
    }

    async edit(id) {
        if(typeof id !== "string") return;
        this.valida();

        if(this.errors.length > 0) return;
        this.contact = await contactModel.findByIdAndUpdate(id, this.body, {new: true})
    }
}

Contact.searchId = async (id) => {
    if(typeof id !== "string") return;
    const contact = await contactModel.findById(id)
    return contact;
}

Contact.searchContacts = async () => {
    const contacts = await contactModel.find()
    .sort({ criadoEm : -1 })
    return contacts;
}

Contact.deleteId = async (id) =>{
    if(typeof id !== "string") return;
    const contact = await contactModel.findOneAndDelete({_id: id})
    return contact;
}

module.exports = Contact;