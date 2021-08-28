const registerModel = require('../models/registerModel')

const Register = registerModel.Register

exports.index = (req, res) =>{
    res.render('register')
}

exports.register = async (req, res) =>{
    try{
        const register = new Register(req.body);
        await register.register()
    
        if(register.errors.length > 0){
            req.flash('errors', register.errors);
            req.session.save(() => {
                return res.redirect('/register');
            });
            return
        }
        
        req.flash('success', `${register.body.user} cadastrado com sucesso`);
        req.session.save(() => {
            return res.redirect('/register');
        });

    }catch(e){
        console.log(e)
        return res.render('error');
    }
}