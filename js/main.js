let carritoCompras = [];

import { traerDatos } from "../bd/bd.js";
const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor")
const dropdawn = document.getElementById('dropdown')
const form = document.getElementById("form");
const divPagar = document.getElementById("divPagar")
const contadorCarrito = document.getElementById('contador-carrito');
const precioTotal = document.getElementById('precioTotal');
const suCompraContenedor = document.getElementById("su-compra-contenedor")

/* let stockProductos = await traerDatos() */
let userActivo = JSON.parse(localStorage.getItem('userActivo'))

window.addEventListener("DOMContentLoaded", agregarAlCarrito)

//filtro radio
const myFunction = async() =>{
    let stockProductos = await traerDatos()
    let talle = document.querySelectorAll('[name="talle"]');
    console.log(talle);

    for (let i = 0; i < talle.length; i++) {
        if (talle[i].checked){
            console.log(talle[i].value);
            if (talle[i].value === "todos") {
                mostrarProductos(stockProductos, rows, current_page);
                setupPagination(stockProductos, pagination, rows);
                
            }else{
                let stockFiltrado = stockProductos.filter((item) => item.talle === talle[i].value);
                mostrarProductos(stockFiltrado, rows, current_page)
                setupPagination(stockFiltrado, pagination, rows);
                
            } 
        }
    }
}

function validarFormulario(e){
    e.preventDefault()
    myFunction()
}

if(form){
    form.addEventListener("submit", validarFormulario) 
}



//filtro rangeSlider
const slider2 = document.getElementById("slider2");
const slider1 = document.getElementById("slider1");
const outputMin = document.getElementById("outputMin")
const outputMax = document.getElementById("outputMax")

if(slider2){
    slider2.oninput = function(){
        outputMax.innerHTML = this.value;
    }
}

if (slider1) {
    slider1.addEventListener("input",(e)=>{
        outputMin.innerHTML = e.target.value;
    })
}


const validarFormRange = async(e) =>{
    let stockProductos = await traerDatos()
    e.preventDefault()
    let valorMin = slider1.value;
    let valorMax = slider2.value;
    let filtroPrecio = stockProductos.filter(producto => producto.precio >= valorMin && producto.precio <= valorMax);
    mostrarProductos(filtroPrecio, rows, current_page)
    setupPagination(filtroPrecio, pagination, rows);
}

const formRange = document.getElementById("formRange");
if(formRange){
    formRange.addEventListener("submit", validarFormRange )
}



//buscador 
const lupa = document.getElementById("lupa");

lupa.addEventListener("click", () => {
    let buscar = document.getElementById("buscar").value;
    filtrarBusqueda (buscar)
})

const filtrarBusqueda = async(buscar) =>{    
    let stockProductos = await traerDatos()
    let filtrar = stockProductos.filter((el) => el.nombre.includes(buscar));
    mostrarProductos(filtrar, rows, current_page)
    setupPagination(filtrar, pagination, rows);
}




//paginacion 
let current_page = 1;
let rows= 8;
let pagination = document.querySelector(".pagination")

function setupPagination(array, wrapper, rows_per_page){
    wrapper.innerHTML = "";

    let page_count = Math.ceil(array.length / rows_per_page);
	for (let i = 1; i < page_count + 1; i++) {
		let btn = PaginationButton(i, array);
		wrapper.appendChild(btn);
	}
}

function PaginationButton (page, array) {
	let button = document.createElement('button');
	button.innerText = page;

	if (current_page == page) button.classList.add('active');

	button.addEventListener('click', function () {
		current_page = page;

        mostrarProductos(array, rows, current_page)

		let current_btn = document.querySelector('.pagination button.active');
		current_btn.classList.remove('active');

		button.classList.add('active');
	});

	return button;
}




//async await
function mostrarProductos(array, rows_per_page, page){
    page --;

    let start = rows_per_page * page;
	let end = start + rows_per_page;
	let paginatedItems = array.slice(start, end);

    if(contenedorProductos){
        if(paginatedItems !== undefined){
            if(contenedorProductos){
                contenedorProductos.innerHTML=""
                for (const el of paginatedItems) {
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
                        agregarAlStorage(el.id);
                    })

                    
                }
                
            }

            
        }
        
    }else{
        false
    }
    
    
}

async function mostrarProductosAsync (){
    let stockProductos = await traerDatos()
    mostrarProductos(stockProductos, rows, current_page)
    setupPagination(stockProductos, pagination, rows);
}

mostrarProductosAsync()


contenedorCarrito.addEventListener("click", (e)=>{
    if(e.target.id === "eliminar"){
        borrarProducto(e.target.dataset.id)
        
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
    }

    
    

})

const borrarProducto = async(id) =>{
    let stockProductos = await traerDatos()
    let productoBorrar = JSON.parse(localStorage.getItem(id))
    let productoOriginal = stockProductos.find(producto => producto.id === parseInt(id))

    if(productoBorrar.cantidad > 1 ){
        productoBorrar.cantidad = productoBorrar.cantidad -1 
        productoBorrar.precio = productoBorrar.precio - productoOriginal.precio
        localStorage.setItem(`${id}`, JSON.stringify(productoBorrar))
        agregarAlCarrito()
    }else{
        localStorage.removeItem(id)
        divPagar.innerHTML = ""
        agregarAlCarrito()
    }

}

const agregarAlStorage = async(id) => {
    let stockProductos = await traerDatos()
    let productoAgregar = stockProductos.find(ele => ele.id ===parseInt(id))
    let productoStorage = JSON.parse(localStorage.getItem(id))

    if(productoStorage === null){
        localStorage.setItem(`${id}`, JSON.stringify({...productoAgregar, cantidad:1}))
        

        
    }else{
        productoStorage.cantidad = productoStorage.cantidad + 1 
        productoStorage.precio = productoStorage.precio + productoAgregar.precio
        localStorage.setItem(`${id}`, JSON.stringify(productoStorage))
        
    }
    agregarAlCarrito()
}

function agregarAlCarrito (){
    
    carritoCompras.length = 0
    for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index)

        typeof JSON.parse(localStorage.getItem(key)) === "object" && key !== 'usuarios' && key !== 'userActivo'  ? carritoCompras.push(JSON.parse(localStorage.getItem(key))): false

        /* key !== "dato" && carritoCompras.push(JSON.parse(localStorage.getItem(key))) */
    }
    
    mostrarCarrito()
    actualizarTotalesCarrito()
    
}

const mostrarCarrito = () => {
    contenedorCarrito ? contenedorCarrito.innerHTML = "" : false
    suCompraContenedor ? suCompraContenedor.innerHTML = "" : false

    carritoCompras.forEach(producto => {
    const {img, nombre, precio, cantidad, id} = producto
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
    suCompraContenedor ?
        suCompraContenedor.innerHTML += `<div class="divCarrito">
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
        : false
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

suCompraContenedor ? suCompraContenedor.addEventListener("click", (e)=>{
    if(e.target.id === "eliminar" ){
        borrarProducto(e.target.dataset.id) && agregarAlCarrito()

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
    }

    
}) : false



function validarCompra (){
    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;
    const tarjeta = document.getElementById("tarjeta-credito").value ;
    const nombreTitular = document.getElementById("nombre-titular").value;
    const mesVenc = document.getElementById("mes-venc").value;
    const anioVenc = document.getElementById("año-venc").value;
    const cvv = document.getElementById("cvv").value;

    if(nombre === "" ){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Por favor introduzca su nombre',
            showConfirmButton: false,
            timer: 1500
        })
    }else if (direccion === ""){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Por favor introduzca su direccion',
            showConfirmButton: false,
            timer: 1500
        })
    }else if(tarjeta === "" || nombreTitular === "" || mesVenc === "" || anioVenc === "" || cvv === ""){
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Por favor llene todos los casilleros del método de pago',
            showConfirmButton: false,
            timer: 1500
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Compra realizada con éxito',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

let btnComprar = document.getElementById("btn-comprar")
btnComprar.addEventListener("click", () => {
    validarCompra()
    
})

//login-signup
userActivo === null ?
dropdawn.innerHTML = `<button class="dropbtn">Mi cuenta</button>
<div class="dropdown-content ">
  <a href="./pages/iniSesion.html">Iniciar sesión</a>
  <a href="#">Mi carrito</a>
  <a href="#">Mis compras</a>
</div>`
:
dropdawn.innerHTML = `<button class=" dropbtn">Bienvenido! ${userActivo.usuario}</button>
<div class="dropdown-content ">
    <a id="cerrarSesion">Cerrar Sesion</a>
    <a href="#">Novedades</a>
    <a href="#">Contacto</a>
</div> `

dropdawn.addEventListener("click", (e) => {
    if(e.target.id === "cerrarSesion"){
        localStorage.removeItem("userActivo")
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sesión cerrada con éxito',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(() => {
            location.reload()
        }, 1500);
    }
})
