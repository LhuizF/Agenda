const validator = require('validator')

export default class ValidateLogin{
    constructor(form){
        this.from = document.querySelector(form);

    }
    init(){
        this.events()
    }
    
    events(){
        if(!this.from) return;

        this.from.addEventListener('submit', e =>{
            if(this.validate(e)){
                e.preventDefault();
            }
        })
    }

    validate(e){
        const el = e.target;
        let error = false
        
        const formP = el.querySelectorAll('.input-container p')
        if(formP){
            for(let errorText of formP){
                errorText.remove()
            }
        }
        
        const emailInput = el.querySelector('input[name="email"]');
        const passwordInput = el.querySelector('input[name="password"]');

        if(!validator.isEmail(emailInput.value)){
            this.errorAlert(emailInput, "Email invalido")
            error = true
        }
        
        if(passwordInput.value.length < 6 || passwordInput.value.length > 20){
            this.errorAlert(passwordInput, 'A senha precisa ter entre 6 a 20 caracteres');
            error = true
        }

        return error
    }

    errorAlert(input, msg){
        const p = document.createElement('p')
        p.innerHTML = msg;
        input.parentElement.appendChild(p)
    }
}