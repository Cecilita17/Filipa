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

const contadorCarrito = document.getElementById('contador-carrito');
const precioTotal = document.getElementById('precioTotal');



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

slider1.oninput = function(){
    outputMin.innerHTML = this.value;
}

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
            agregarAlCarrito(el.id);
        })
    }
    
}

function agregarAlCarrito(id){
    let yaExiste = carritoCompras.find(element => element.id === id)
    if(yaExiste){
        //alert("El producto seleccionado ya está en el carrito")
        yaExiste.cantidad = yaExiste.cantidad + 1
        document.getElementById(`cantidad${yaExiste.id}`).innerHTML = `<p id="cantidad${yaExiste.id}">cantidad: ${yaExiste.cantidad}</p>`
        actualizarCarrito()

        
    }else{
        let productoAgregar = stockProductos.find(ele => ele.id === id)
        //console.log(productoAgregar);
        productoAgregar.cantidad = 1
        carritoCompras.push(productoAgregar)
        actualizarCarrito()
        mostrarCarrito(productoAgregar)
    }
}

function mostrarCarrito(productoAgregar) {
    let div = document.createElement('div')
    div.classList.add('productoEnCarrito')
    div.innerHTML = `<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                    <button class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)
}

function actualizarCarrito(){
    contadorCarrito.innerText = carritoCompras.reduce((acc,el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)

}