export const traerDatos = async() => {
  let respuesta = await fetch("../js/stock.json")
        return respuesta.json()
}
