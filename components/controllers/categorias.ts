import { categoria } from "../templates/categoria";
import { obtenerCategorias } from "../sql/categoria";

export {lcategorias} 

let lcategorias: categoria[] = [];

export async function MostrarCategorias () {
    lcategorias = await obtenerCategorias();

    let lista = <HTMLElement>document.getElementById("idcategoria");
    let elementos = '<option selected> Seleccione una opción</option>'
    if (lcategorias.length > 0) {
      for (let i = 0; i < lcategorias.length; i++) {
        elementos += '<option value = "' + lcategorias[i].idcategoria+ '">' + lcategorias[i].descripcion + '</option>';
      }
    } else {
      elementos += '<option value = "0">No hay categorías</option>';
    }
    lista.innerHTML = elementos;
}