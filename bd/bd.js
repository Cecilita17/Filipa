export const traerDatos = async() => {
  let respuesta = await fetch("../stock.json")
        return respuesta.json()
}
