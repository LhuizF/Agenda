const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
    name:{type: String, require: true},
    lastName:{type: String, require: false, default: ''},
    email:{type: String, require: false, default: ''},
    telephone:{type: Number, require: false, default: ''},
    createdDate:{type: Date, default: () => {
        
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

        //e-mail
        if(this.body.email && !validator.isEmail(this.body.email)){
            this.addError('E-mail inválido');
        }

        if(!this.body.name) this.addError('O campo nome não pode ser nulo.');

        if(!this.body.email && !this.body.telephone) this.addError('O campo Email ou Telefone deve ser preenchido')
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
}

module.exports = Contact;