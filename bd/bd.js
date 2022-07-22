export const traerDatos = async() => {
    let respuesta = await fetch("./bd/stock.json")
    return respuesta.json()
}

/* import{}from"../bd/stock.json" */