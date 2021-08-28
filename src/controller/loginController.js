const Login = require('../models/loginModel')

exports.index = (req, res) =>{
    if(req.session.user) return res.render('loginComplete')
    res.render('login')
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
            return;
        }

        req.flash('success', `${login.body.user} Logado com sucesso.`);
        req.session.user = login.user;
        req.session.save(() => {
            res.redirect('/login');
        });

    }catch(e){
        console.log(e)
        return res.render('error');
    }
}

exports.logout = (req, res) =>{
    req.session.destroy();
    res.redirect('/')
}
