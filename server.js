const dotenv = require('dotenv').config();

const express = require("express");
const app = express();

//banco de dados
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTSTRING ,{ useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() =>{
        console.log('conectado com o BD');
        app.emit('okay');
    })
    .catch(e => console.log(e));

const session = require('express-session'); //salva os cookie do navegador
const MongoStore = require('connect-mongo'); //salvar as sessoes no BD
const flash = require('connect-flash');//msg auto destrutivas 
const helmet = require('helmet');// segurança
const csrf = require('csurf')//segurança com tokens

//config da sessão 
const sessionConfig = session({
    secret: 'sadcwuigcw ihwn i iwndiwjd w dkwj  wi dnwdih wdncijd',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
})

const routes = require('./routes'); // as rotas da aplicação 
const path = require('path'); //caminhos 
const{ middlewareGlobal, checkCSRFErr, CSRFMiddleware } = require('./src/middlewares/middleware');

app.use(sessionConfig);
app.use(flash());
app.use(helmet())

app.use(express.urlencoded({extended: true})); //permite postar formularios na aplicação
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));// arquivos estaticos acessados diretamente

app.use(csrf())

//ativamdp os middlewares
app.use(middlewareGlobal);
app.use(checkCSRFErr);
app.use(CSRFMiddleware);

app.use(routes);

app.set('views' , path.resolve(__dirname, 'src', 'views')); // arquivos q são renderizados
app.set('view engine', 'ejs');

app.on('okay', () => {
    app.listen(3000, () => {
        console.log('Host: http://localhost:3000');
        console.log('Servidor Online');
    });
});
