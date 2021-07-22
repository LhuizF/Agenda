exports.middlewareGlobal = (req, res, next) => {
    console.log('passei no middlewareGlobal');
    next();
};

exports.checkCSRFErr = (err, req, res, next) => {
    if(err){
        return res.render('error');
    }
    next()
}

exports.CSRFMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}