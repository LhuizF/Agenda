import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css';
import './assets/css/alerts.css'
import './assets/css/login.css';
import './assets/css/btnMenu.css';

import ValidateLogin from './assets/js/login'
import ValidateRegister from './assets/js/register'

const login = new ValidateLogin('.login-container');
login.init()

const register = new ValidateRegister('.register-container');
register.init()