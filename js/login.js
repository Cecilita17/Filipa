/* const formLogin = document.getElementById("formLogin")
const user = document.getElementById('userr')
const contrasenia = document.getElementById('pass')
const checkbox = document.getElementById('checkbox')
const btnIngresar = document.getElementById('btnIngresar') */

const formSignUp = document.getElementById('formSignUp')
const btnRegistrar = document.getElementById('btnRegistrar')

const datos = JSON.parse(localStorage.getItem("datos")) || []; 

btnRegistrar.addEventListener("click", ()=>{
    const crearUser = document.getElementById('crearUser').value
    const email = document.getElementById('email').value
    const crearPas = document.getElementById('crearPas').value
    const rePassword = document.getElementById('rePassword').value
    
    crearUsuario(crearUser, email, crearPas, rePassword)
})


class NewUser{
    constructor(usuario, email, contrasenia, repContrasenia){
        this.usuario = usuario,
        this.email = email,
        this.contrasenia = contrasenia,
        this.repContrasenia = repContrasenia;
    }
}

function crearUsuario (crearUser, email, crearPas, rePassword ){
    
    datos.push(new NewUser(crearUser, email, crearPas, rePassword ))
    
    localStorage.setItem("dato", JSON.stringify(datos))
    
    /* document.getElementById('crearUser').value = ""
    document.getElementById('email').value= ""
    document.getElementById('crearPas').value= ""
    document.getElementById('rePassword').value = "" */
}




