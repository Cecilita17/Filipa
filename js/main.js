const contenedorProductos = document.getElementById("contenedor-productos");
const talles = document.getElementById("talles");
const submit = document.getElementById("submit");
const form = document.getElementById("form");
const L = document.getElementById("talleL")
const M = document.getElementById("talleM")
const S = document.getElementById("talleS")
const talleTodos = document.getElementById ("talleTodos")



//filtro
/* talleTodos.addEventListener("click", ()=>{
    if ($("talleTodos").is(":checked")) {
        mostrarProductos(stockProductos)
    }else{
        let stockFiltrado = stockProductos.filter(item => item.talle == "talleS" || item.talle == "talleM" || item.talle == "talleL"  )
    
        mostrarProductos(stockFiltrado)
    }
}) */


function myFunction (){
    let talle = document.form[0]
    let txt = "";
    let i;

    for (let i = 0; i < talle.lengtht; i++) {
        
        if (talle[i].checked){
            
            mostrarProductos(stockProductos)
        }else{
            let stockFiltrado = stockProductos.filter(item => item.talle == talle[i] )
        
            mostrarProductos(stockFiltrado)
        }
    }

}



function validarFormulario(e){
    e.preventDefault()
    myFunction()
}

form.addEventListener("submit", validarFormulario) 

//buscando
mostrarProductos(stockProductos);

//logica ecommerce
function mostrarProductos(array){
    
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

