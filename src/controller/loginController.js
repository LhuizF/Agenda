const Login = require('../models/loginModel')

exports.index = (req, res) =>{
    if(req.session.user) return res.render('loginComplete')
    console.log(req.session.user)
    res.render('login')
}

exports.register = async (req, res) =>{
    try{
        const login = new Login(req.body);
        await login.register()
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            });
            return
        }
        
        req.flash('success', `${login.body.email} cadastrado com sucesso`);
        req.session.save(() => {
            return res.redirect('/login');
        });

    }catch(e){
        console.log(e)
        return res.render('error');
    }
}

exports.login = async (req, res) =>{
    try{
        const login = new Login(req.body);
        await login.login()
    
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(() => {
                return res.redirect('/login');
            });
            return
        }

        req.flash('success', `${login.body.email} Logado com sucesso.`);
        req.session.user = login.user;
        req.session.save(() => {
            return res.redirect('/login');
        });

    }catch(e){
        return res.render('error');
    }
}

exports.logout = (req, res) =>{
    req.session.destroy();
    res.redirect('/')
}