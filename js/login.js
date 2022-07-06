/* const formLogin = document.getElementById("formLogin")
const user = document.getElementById('userr')
const contrasenia = document.getElementById('pass')
const checkbox = document.getElementById('checkbox')
const btnIngresar = document.getElementById('btnIngresar') */

const formSignUp = document.getElementById('formSignUp')
const btnRegistrar = document.getElementById('boton-registrar')

const datos = JSON.parse(localStorage.getItem("datos")) || []; 

btnRegistrar.addEventListener("click", (e)=>{
    e.preventDefault()
    const crearUser = document.getElementById('crearUser').value
    const email = document.getElementById('email').value
    const crearPas = document.getElementById('crearPas').value
    const rePassword = document.getElementById('rePassword').value
    
    crearUsuario(crearUser, email, crearPas, rePassword)

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
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.location.href ="./iniSesion.html"
        } else if (result.isDenied) {
            window.location.href = "../index.html"
        }
        
    })
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
    localStorage.setItem("dato", JSON.stringify(new NewUser(crearUser, email, crearPas, rePassword )))
    
    /* document.getElementById('crearUser').value = ""
    document.getElementById('email').value= ""
    document.getElementById('crearPas').value= ""
    document.getElementById('rePassword').value = "" */
}




