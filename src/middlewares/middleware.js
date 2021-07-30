exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.checkCSRFErr = (err, req, res, next) => {
    if(err){
        return res.render('error');
    }
    next()
};

exports.CSRFMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) =>{
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        return req.session.save(() => res.redirect('/'));
    }
    next()
};