const contenedorProductos = document.getElementById("contenedor-productos");
const talles = document.getElementById("talles");
const submit = document.getElementById("submit");
const form = document.getElementById("form");
const L = document.getElementById("talleL")
const M = document.getElementById("talleM")
const S = document.getElementById("talleS")
const talleTodos = document.getElementById ("talleTodos")



//filtro radio

//antes
/* function myFunction (){
    let talle = document.form[0]
    let txt = "";
    let i;

    for (let i = 0; i < talle.length; i++) {
        
        if (talle[i].checked){
            
            mostrarProductos(stockProductos)
        }else{
            let stockFiltrado = stockProductos.filter(item => item.talle == talle[i] )
        
            mostrarProductos(stockFiltrado)
        }
    }

} */


//despues
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


//lo que no me sale
function validarFormRange(e){
    e.preventDefault()
    const rangeS = document.querySelectorAll('input[type="range"]');
        
    /* for (let i = 0; i < talle.length; i++){
        if (stockProductos.precio > rangeS[0].output) {
            let arrayNuevo1 = stockProductos.filter((item) => item.precio > rangeS[0].value)
            mostrarProductos(arrayNuevo1)
        }else if (stockProductos.precio < rangeS[1].output) {
            let arrayNuevo2 = stockProductos.filter((item) => item.precio < rangeS[1].value)
            mostrarProductos(arrayNuevo2)
        }
    } */
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
                            <a href="#" id="${el.id}" class="btn boton">Seleccionar</a>
                        </div>`;
                        
        
        contenedorProductos.appendChild(div)
    }
    
}

