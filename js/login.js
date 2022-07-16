const btnIngresar = document.getElementById('btnIngresar') 
const btnRegistrar = document.getElementById('boton-registrar')

const usuariosLS = JSON.parse(localStorage.getItem("usuarios")); 
let usuarios = []

//Registrarse

btnRegistrar?
btnRegistrar.addEventListener("click", (e)=>{
    e.preventDefault()
    const crearUser = document.getElementById('crearUser').value
    const email = document.getElementById('email').value
    const crearPas = document.getElementById('crearPas').value
    const rePassword = document.getElementById('rePassword').value

    validarSignup(crearUser, crearPas, rePassword, email)

    
}) : false

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
            'Contraseña debe ser mayor a 5 digitos',
            'error'
          )
    }else if(crearPas !== rePassword){
        Swal.fire(
            'ERROR!',
            'Las contraseñas no coinciden',
            'error'
          )
    }else if (usuariosLS !== null){
        if (usuariosLS.find(user => user.usuario === crearUser)) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El usuario ya se encuentra registrado',
                showConfirmButton: false,
                timer: 1500
            })

        }else{
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
                if (result.isConfirmed) {
                    window.location.href ="./iniSesion.html"
                } else if (result.isDenied) {
                    window.location.href = "../index.html"
                }
                
            })
        }
        
    }else{
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
            if (result.isConfirmed) {
                window.location.href = "./iniSesion.html"
            } else if (result.isDenied) {
                window.location.href = "../index.html"
            }

        })
    }
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
    if (usuariosLS === null){
        usuarios.push(new NewUser(crearUser, email, crearPas, rePassword))
        localStorage.setItem("usuarios", JSON.stringify(usuarios))
    }else{
        console.log(usuariosLS);
        let nuevoUsuario = new NewUser(crearUser, email, crearPas, rePassword)
        localStorage.setItem("usuarios", JSON.stringify([...usuariosLS, nuevoUsuario]))
    }
}


//Iniciar sesion

btnIngresar ? btnIngresar.addEventListener("click", (e)=> {
    e.preventDefault()
    let user = document.getElementById('userr').value
    let pass = document.getElementById('pass').value
    validarLogin(user, pass)
    
}) : false

function validarLogin(user, pass){
    if (usuariosLS !== undefined || usuariosLS !== null){
        let usuarioExiste = usuariosLS.find(usuario => usuario.usuario === user)
        if(usuarioExiste === undefined || usuarioExiste === null){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'El usuario no se encuentra registrado.',
                showConfirmButton: false,
                timer: 1500
            })
        }else{
            if(usuarioExiste.usuario === user && usuarioExiste.contrasenia == pass){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'inicio de sesion exitoso',
                    showConfirmButton: false,
                    timer: 1500
                })
                setTimeout(() => {
                    window.location.href = "../index.html"
                }, 1500);

                localStorage.setItem("userActivo", JSON.stringify(usuarioExiste))
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
    }else{
        
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'El usuario no se encuentra registrado.',
            showConfirmButton: false,
            timer: 1500
        })
    }
    
}


