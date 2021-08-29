const mongoose = require('mongoose');
const validator = require('validator');
const bcryprjs = require('bcryptjs');

const loginSchema = new mongoose.Schema({
    user: { type:String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const loginModel = mongoose.model('login', loginSchema)

class Register{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
        this.aa = body
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

        //usuário
        if(this.body.user.length < 3 || this.body.user.length > 12 || !this.body.user.match(/[a-zA-Z0-9]+/g)){
            this.addError('Nome de usuário inválido');
            
        }

        //e-mail
        if(!validator.isEmail(this.body.email)){
            this.addError('E-mail inválido');
        }

        //senha
        if(this.body.password.length < 6 || this.body.password.length > 20){
            this.addError('A senha precisa ter entre 6 a 20 caracteres');
        }

        if(this.body.password !== this.body.confirmPassword){
            this.addError('As senhas devem ser iguais');
        }
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        
        this.body = {
            user: this.body.user,
            email: this.body.email,
            password: this.body.password,
            confirmPassword: this.body.confirmPassword
        }
    }

    saltPassword(){
        const salt = bcryprjs.genSaltSync();
        this.body.password = bcryprjs.hashSync(this.body.password, salt);
    }

    async checkUser(){
        const user = await loginModel.findOne({ user: this.body.user });
        if(user) this.addError('Usuário já cadastrado');

        const email = await loginModel.findOne({ email: this.body.email });
        if(email) this.addError('Email já cadastrado');
    }

    addError(msg){
        this.errors.push(msg)
    }
}

module.exports = {Register, loginModel}