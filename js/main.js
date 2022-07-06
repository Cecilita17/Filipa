let carritoCompras = [];

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor")

const talles = document.getElementById("talles");
const submit = document.getElementById("submit");

const form = document.getElementById("form");
const L = document.getElementById("talleL")
const M = document.getElementById("talleM")
const S = document.getElementById("talleS")
const talleTodos = document.getElementById ("talleTodos")

const divPagar = document.getElementById("divPagar")

const contadorCarrito = document.getElementById('contador-carrito');
const precioTotal = document.getElementById('precioTotal');

const suCompraContenedor = document.getElementById("su-compra-contenedor")

window.addEventListener("DOMContentLoaded", agregarAlCarrito)


//filtro radio
function myFunction (){
    let talle = document.querySelectorAll('[name="talle"]');
    console.log(talle);

    for (let i = 0; i < talle.length; i++) {
        if (talle[i].checked){
            console.log(talle[i].value);
            if (talle[i].value === "todos") {
                mostrarProductos(stockProductos);
            }else{
                let stockFiltrado = stockProductos.filter((item) => item.talle === talle[i].value);
                mostrarProductos(stockFiltrado)
            } 
        }
    }
}

function validarFormulario(e){
    e.preventDefault()
    myFunction()
}
form.addEventListener("submit", validarFormulario) 


//filtro rangeSlider
const slider2 = document.getElementById("slider2");
const slider1 = document.getElementById("slider1");
const outputMin = document.getElementById("outputMin")
const outputMax = document.getElementById("outputMax")

slider2.oninput = function(){
    outputMax.innerHTML = this.value;
}

/* slider1.oninput = function(){
    outputMin.innerHTML = this.value;
} */

slider1.addEventListener("input",(e)=>{
    outputMin.innerHTML = e.target.value;
})

function validarFormRange(e){
    e.preventDefault()
    let valorMin = slider1.value;
    let valorMax = slider2.value;
    let filtroPrecio = stockProductos.filter(producto => producto.precio >= valorMin && producto.precio <= valorMax);
    mostrarProductos(filtroPrecio)
}

const formRange = document.getElementById("formRange");
formRange.addEventListener("submit", validarFormRange )


//buscando
mostrarProductos(stockProductos);

//logica ecommerce
function mostrarProductos(array){
    contenedorProductos.innerHTML=""
    for (const el of array) {
        let div = document.createElement("div");
        div.className = "producto card-color m-3"
        div.innerHTML = `<img src="${el.img}" class="mt-2 card-img-top" alt="...">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <h2 class="card-title">${el.nombre}</h2>
                            <p class="card-text">${el.precio}</p>
                            <p>${el.talle}</p>
                            <a id="boton${el.id}" class="btn boton">Agregar</a>
                        </div>`;
        
        contenedorProductos.appendChild(div)

        let btnAgregar = document.getElementById(`boton${el.id}`)

        btnAgregar.addEventListener("click", () =>{
            console.log(el.id);
            agregarAlStorage(el.id);
        })
    }
    
}

contenedorCarrito.addEventListener("click", (e)=>{
    /* if(e.target.id === "eliminar"){
        borrarProducto(e.target.dataset.id)
        
    } */
    e.target.id === "eliminar" && borrarProducto(e.target.dataset.id);
    
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        destination: "#index.html",
        newWindow: false,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, rgb(170, 96, 96), white,  rgb(170, 96, 96), white) ",
          color: "black",
        },
        onClick: function(){} // Callback after click
      }).showToast();

})

function borrarProducto(id){
    let productoBorrar = JSON.parse(localStorage.getItem(id))
    let productoOriginal = stockProductos.find(producto => producto.id === parseInt(id))
    if(productoBorrar.cantidad > 1 ){
        productoBorrar.cantidad = productoBorrar.cantidad -1 
        productoBorrar.precio = productoBorrar.precio - productoOriginal.precio
        localStorage.setItem(`${id}`, JSON.stringify(productoBorrar))
    }else{
        localStorage.removeItem(id)
        divPagar.innerHTML = ""
    }
    agregarAlCarrito()
    
}


function agregarAlStorage(id){
    let productoStorage = JSON.parse(localStorage.getItem(id))
    let productoAgregar = stockProductos.find(ele => ele.id === id)

    if(productoStorage === null){
        localStorage.setItem(`${id}`, JSON.stringify({...productoAgregar, cantidad:1}))
        agregarAlCarrito()

        
    }else{
        productoStorage.cantidad = productoStorage.cantidad + 1 
        productoStorage.precio = productoStorage.precio + productoAgregar.precio
        localStorage.setItem(`${id}`, JSON.stringify(productoStorage))
        agregarAlCarrito()

    }
}

function agregarAlCarrito (){
    carritoCompras.length = 0
    for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index)
        typeof JSON.parse(localStorage.getItem(key)) == "object" && key !== "dato" && carritoCompras.push(JSON.parse(localStorage.getItem(key)))
    }
    mostrarCarrito()
    actualizarTotalesCarrito()
    
}



function mostrarCarrito() {
    contenedorCarrito.innerHTML = ""
    carritoCompras.forEach(producto => {
        const {img, nombre, precio, cantidad, id} = producto
        console.log(producto.id);
        contenedorCarrito.innerHTML += `<div class="divCarrito">
                                            <img src="${img}" class="imgCarrito mt-2 card-img-top" alt="...">
                                            <div><hr></div>
                                            <div class="divCarritoLadoImagen">
                                                <p class="productoNombre"> ${nombre}</p>
                                                <div>
                                                    <p>Precio: $${precio}</p>
                                                    <p>Cantidad: ${cantidad}</p>
                                                    <button class="boton-eliminar"><i id="eliminar" data-id="${id}" class="fas fa-trash-alt"></i><span class="elimTexto">Eliminar</span></button>
                                                </div>
                                            </div>
                                        </div>`

            //agregar items del carrito a pagina de envio/pago
            
        /* suCompraContenedor.innerHTML += `<div class="divCarrito">
                                            <img src="${producto.img}" class="imgCarrito mt-2 card-img-top" alt="...">
                                            <div><hr></div>
                                            <div class="divCarritoLadoImagen">
                                                <p class="productoNombre"> ${producto.nombre}</p>
                                                <div>
                                                    <p>Precio: $${producto.precio}</p>
                                                    <p>Cantidad: ${producto.cantidad}</p>
                                                    <button class="boton-eliminar"><i id="eliminar" data-id="${producto.id}" class="fas fa-trash-alt"></i><span class="elimTexto">Eliminar</span></button>
                                                </div>
                                            </div>
                                        </div>` */

    })
}


function actualizarTotalesCarrito(){
    if (carritoCompras.length > 0) {
        contadorCarrito.innerText = carritoCompras.reduce((cdadTotal,{cantidad}) => cdadTotal + cantidad, 0)
        precioTotal.innerText = `Precio total: $${carritoCompras.reduce((precioTotal,{precio})=> precioTotal + precio , 0)}`
        divPagar.innerHTML = `<a href="">Seguir comprando</a>
         <a href="../pages/direccionPago.html"><button class="boton btn">Pagar</button></a> ` 
    }else{
        contadorCarrito.innerText = ""
        precioTotal.innerHTML = `<div class="modalP">
                                    <p> Tu carrito de compras está vacío </p>
                                     <a href="./index.html"> Volver a la tienda</a>
                                </div>`
        
    }
    

}


//Envio y pago tabs
function setUpTabs() {
    
    document.querySelectorAll(".tab-button").forEach(button =>{
        button.addEventListener("click", ()=> {
            
            const tabsContainer = button.parentElement;
            const envioPago = tabsContainer.parentElement
            const tabNumber = button.dataset.forTab;
            const tabToActivate = envioPago.querySelector(`.tab-content[data-tab="${tabNumber}"]`);


            tabsContainer.querySelectorAll(".tab-button").forEach(button => {
                button.classList.remove("tab-button--active")
            })

            envioPago.querySelectorAll(".tab-content").forEach(tab => {
                tab.classList.remove("tab-content--active")
            })

            button.classList.add("tab-button--active")
            tabToActivate.classList.add("tab-content--active")
        })

    })
}

document.addEventListener("DOMContentLoaded", ()=> {
    setUpTabs();
})