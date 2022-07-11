/* const formLogin = document.getElementById("form-login")
const formSignUp = document.getElementById('formSignUp') */




const btnIngresar = document.getElementById('btnIngresar') 
const btnRegistrar = document.getElementById('boton-registrar')

const datos = JSON.parse(localStorage.getItem("datos")) || []; 


//Registrarse
function validarSignup(crearUser, crearPas, rePassword){
    if(crearUser == "" || crearPas == "" ||rePassword == ""){
        Swal.fire(
            'ERROR!',
            'Los campos no deben estar vacios',
            'error'
          )
    }else if(crearPas.length < 5){
        Swal.fire(
            'ERROR!',
            'Contraseña debe ser mayor a 7 digitos',
            'error'
          )
    }else if(crearPas !== rePassword){
        Swal.fire(
            'ERROR!',
            'Las contraseñas no coinciden',
            'error'
          )
    }else{
        Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Iniciar sesión',
            confirmButtonColor: 'rgb(170, 96, 96)',
            denyButtonText: `Volver al inicio`,
            denyButtonColor: 'rgb(170, 96, 96)',
            
          }).then((result) => {
            if (result.isConfirmed) {
                window.location.href ="./iniSesion.html"
            } else if (result.isDenied) {
                window.location.href = "../index.html"
            }
            
        })
    }

    
    
}

if (btnRegistrar){
    btnRegistrar.addEventListener("click", (e)=>{
        e.preventDefault()
        const crearUser = document.getElementById('crearUser').value
        const email = document.getElementById('email').value
        const crearPas = document.getElementById('crearPas').value
        const rePassword = document.getElementById('rePassword').value
        
        crearUsuario(crearUser, email, crearPas, rePassword)

        validarSignup(crearUser, crearPas, rePassword)
    
        
    })
}



class NewUser{
    constructor(usuario, email, contrasenia, repContrasenia){
        this.usuario = usuario,
        this.email = email,
        this.contrasenia = contrasenia,
        this.repContrasenia = repContrasenia;
    }
}

function crearUsuario (crearUser, email, crearPas, rePassword ){
    /* datos.push(localStorage.setItem("dato", JSON.stringify(new NewUser(crearUser, email, crearPas, rePassword )))) */

    datos.push(new NewUser(crearUser, email, crearPas, rePassword))
    localStorage.setItem("dato", JSON.stringify(datos))

    /* localStorage.setItem("dato", JSON.stringify(new NewUser(crearUser, email, crearPas, rePassword ))) */

    console.log(datos);
}


//Iniciar sesion
let recuperarLS = JSON.parse(localStorage.getItem('dato'))
const contr = recuperarLS[0].contrasenia;
const usu = recuperarLS[0].usuario;

/* const [usu, , contr] = recuperarLS */

const user = document.getElementById('userr')
const pass = document.getElementById('pass')

function validarLogin(user, pass){
    
    if(user.value == usu && pass.value == contr){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'inicio de sesion exitoso',
            showConfirmButton: false,
            timer: 1500
          })
    
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
            showConfirmButton: false,
            timer: 1500
          })
    }
}

/* function save() {	
	const checkbox = document.getElementById('checkbox')
    localStorage.setItem("checkbox", JSON.stringify(checkbox.checked));	
}

function rememberMe(){
    if (checkbox.checked && user.value !== ""){
    recuperarLS[0].usuario = user.value;
    localStorage.checkbox = checkbox.value;
}else{
    recuperarLS[0].usuario = "";
    recuperarLS[0].contrasenia = "";
}}
 */

if(btnIngresar){
    btnIngresar.addEventListener("click", (e)=> {
        e.preventDefault()
        validarLogin(user, pass)
        /* rememberMe() */
        
    })
}


console.log(recuperarLS[0]);