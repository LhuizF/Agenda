const mongoose = require('mongoose');
const validator = require('validator')
const bcryprjs = require('bcryptjs')


const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const loginModel = mongoose.model('login', loginSchema)

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login(){
        this.valida();
        if(this.errors.length > 0) return;

        this.user = await loginModel.findOne({ email: this.body.email });
        if(!this.user || !bcryprjs.compareSync(this.body.password, this.user.password)) {
            this.addError('Usuário ou senha não incorretos.');
            return;
        }
    }


    async register() {
        this.valida();
        await this.checkUser()
        
        if(this.errors.length > 0) return;
        
        this.saltPassword()

        this.user = await loginModel.create(this.body);
        
    }

    valida(){
        this.cleanUp()

        //e-mail
        if(!validator.isEmail(this.body.email)){
            this.addError('E-mail inválido');
        }

        //senha
        if(this.body.password.length <3 || this.body.password.length > 20){
            this.addError('A senha precisa ter entre 5 a 20 caracteres');
        }
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

    saltPassword(){
        const salt = bcryprjs.genSaltSync();
        this.body.password = bcryprjs.hashSync(this.body.password, salt);
    }

    async checkUser(){
        this.user = await loginModel.findOne({ email: this.body.email });
        if(this.user) this.addError('Usuário já cadastrado');
    }

    addError(msg){
        this.errors.push(msg)
    }
}

module.exports = Login