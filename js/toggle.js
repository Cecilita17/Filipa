const carritoAbrir = document.getElementById("boton-carrito");
const carritoCerrar = document.getElementById("carritoCerrar");

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

carritoAbrir.addEventListener("click", ()=>{
    contenedorModal.classList.toggle("modal-active")
})

carritoCerrar.addEventListener("click", ()=>{
    contenedorModal.classList.toggle("modal-active")
})

modalCarrito.addEventListener("click", (e)=>{
    e.stopPropagation()
})

contenedorModal.addEventListener("click", ()=>{
    carritoCerrar.click()
})

//menu hamburguesa

const botonHambur = document.getElementById("nav-toggle")
const nav2 = document.getElementById("nav2")
const menuCerrar = document.getElementById("nav-toggle-cerrar")

botonHambur.addEventListener("click", ()=>{
    nav2.classList.toggle("visible")
    
})

menuCerrar.addEventListener("click", ()=>{
    nav2.classList.toggle("visible")
})
