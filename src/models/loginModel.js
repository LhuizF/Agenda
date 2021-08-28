const mongoose = require('mongoose');
const validator = require('validator')
const bcryprjs = require('bcryptjs')
const registerModel = require('./registerModel')


const loginModel = registerModel.loginModel;

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    
    async login(){
        this.cleanUp();
        if(this.errors.length > 0) return;

        this.user = await loginModel.findOne({ email: this.body.email });
        
        if(!this.user || !bcryprjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Usuário ou senha incorretos.');
            return;
        }
        
        this.body = this.user
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
}

module.exports = Login