export const traerDatos = async() => {
    let respuesta = await fetch("../bd/stock.json")
    return respuesta.json()
}

