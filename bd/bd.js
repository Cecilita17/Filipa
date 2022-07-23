export const traerDatos = async() => {
    let url = "/bd/stock.json"
    let respuesta = await fetch(url)
    return respuesta.json()
}

