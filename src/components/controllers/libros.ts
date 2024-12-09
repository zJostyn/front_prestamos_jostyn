import { libro } from "../templates/libro";

import { obtenerTodos, obtenerLibros, obtenerRevistas, crearLibro, actualizarLibro, eliminarLibro } from "../sql/libro";

let llibros: libro[] = [];

export async function MostrarTodos() {
    llibros = await obtenerTodos();
    let lis = "";
    let lista = <HTMLElement>document.getElementById("lista-libros");
    if(llibros.length > 0) {
        for (let i = 0; i < llibros.length; i++) {
            lis = "<tr>" + lis + "<td>" + llibros[i].codigo + "</td>" +
                "<td>" + llibros[i].tipo + "</td>" +
                "<td data-id=" + llibros[i].idcategoria + ">" + llibros[i].categoria + "</td>" +
                "<td>" + llibros[i].editorial + "</td>" +
                "<td>" + llibros[i].nombre + "</td>" +
                "<td>" + llibros[i].autor + "</td>" +
                "<td>" + llibros[i].aniopublicacion + "</td>" +
                "<td>" + llibros[i].estado + "</td>" +
                `<td><button class="editar btn btn-warning" style="background: linear-gradient(90deg, #ffff57d8, #f69c01); color: black;">Editar</button> <button class="eliminar btn btn-danger" style="background: linear-gradient(90deg, #ff5757, #b60000);">Eliminar</button></td>` + "</tr>";
        }
    } else {
        lis = "<tr><td colspan='8'>No hay libros o revistas en la base de datos.</td></tr>";
    }
    lista.innerHTML = lis;
}

export async function MostrarLibros() {
    llibros = await obtenerLibros();
    let lis = "";
    let lista = <HTMLElement>document.getElementById("lista-libros");
    if(llibros.length > 0) {
        for (let i = 0; i < llibros.length; i++) {
            lis = "<tr>" + lis + "<td>" + llibros[i].codigo + "</td>" +
                "<td>" + llibros[i].tipo + "</td>" +
                "<td data-id=" + llibros[i].idcategoria + ">" + llibros[i].categoria + "</td>" +
                "<td>" + llibros[i].editorial + "</td>" +
                "<td>" + llibros[i].nombre + "</td>" +
                "<td>" + llibros[i].autor + "</td>" +
                "<td>" + llibros[i].aniopublicacion + "</td>" +
                "<td>" + llibros[i].estado + "</td>" +
                `<td><button class="editar btn btn-warning" style="background-color: orange; color: black;">Editar</button> <button class="eliminar btn btn-danger" style="background-color: red;">Eliminar</button></td>` + "</tr>";
        }
    } else {
        lis = "<tr><td colspan='8'>No hay libros en la base de datos.</td></tr>";
    }
    lista.innerHTML = lis;
}

export async function MostrarRevistas() {
    llibros = await obtenerRevistas();
    let lis = "";
    let lista = <HTMLElement>document.getElementById("lista-libros");
    console.log(llibros);
    console.log("Revistas");
    if(llibros.length > 0) {
        for (let i = 0; i < llibros.length; i++) {
            lis = "<tr>" + lis + "<td>" + llibros[i].codigo + "</td>" +
                "<td>" + llibros[i].tipo + "</td>" +
                "<td data-id=" + llibros[i].idcategoria + ">" + llibros[i].categoria + "</td>" +
                "<td>" + llibros[i].editorial + "</td>" +
                "<td>" + llibros[i].nombre + "</td>" +
                "<td>" + llibros[i].autor + "</td>" +
                "<td>" + llibros[i].aniopublicacion + "</td>" +
                "<td>" + llibros[i].estado + "</td>" +
                `<td><button class="editar btn btn-warning" style="background-color: orange; color: black;">Editar</button> <button class="eliminar btn btn-danger" style="background-color: red;">Eliminar</button></td>` + "</tr>";
        }
    } else {
        lis = "<tr><td colspan='8'>No hay revistas en la base de datos.</td></tr>";
    }
    lista.innerHTML = lis;
}

export async function MostrarLibrosPrestamos() {
    llibros = await obtenerTodos();

    let lista = <HTMLElement>document.getElementById("codigo");
    let elementos = '<option selected> Seleccione una opción</option>'
    for (let i = 0; i < llibros.length; i++) {
        if (llibros[i].estado == "No") {
            elementos += '<option value = "' + llibros[i].codigo + '">' + "Nombre: " + llibros[i].nombre + " Tipo: " + llibros[i].tipo + '</option>';
        } else {
            elementos += '<option value = "Si" disabled style="color:red;">' + "Nombre: " + llibros[i].nombre + " Tipo: " + llibros[i].tipo + '</option>';
        }
    }
    lista.innerHTML = elementos;
}

export async function MostrarLibrosDevolucion() {
    llibros = await obtenerTodos();

    let lista = <HTMLElement>document.getElementById("codigo");
    let elementos = '<option selected> Seleccione una opción</option>'
    for (let i = 0; i < llibros.length; i++) {
        if (llibros[i].estado == "Si") {
            elementos += '<option value = "' + llibros[i].codigo + '">' + "Nombre: " + llibros[i].nombre + " Tipo: " + llibros[i].tipo + '</option>';
        }
    }
    lista.innerHTML = elementos;
}

export function IngresarLibro() {

    let cod = Number((<HTMLInputElement>document.getElementById("codigo")).value.toString());
    let codalq = (<HTMLInputElement>document.getElementById("codigo")).value.toString();
    let tip = (<HTMLInputElement>document.getElementById("tipo")).value.toString();
    let idcat = Number((<HTMLInputElement>document.getElementById("idcategoria")).value.toString());
    let edi = (<HTMLInputElement>document.getElementById("editorial")).value.toString();
    let nom = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
    let aut = (<HTMLInputElement>document.getElementById("autor")).value.toString();
    let anio = Number((<HTMLInputElement>document.getElementById("aniopublicacion")).value.toString());

    const op = new libro(cod, tip, idcat, edi, nom, aut, anio, "No", "Default");

    try {
        if (op.codigo && op.tipo && op.idcategoria && op.editorial && op.nombre && op.autor && op.aniopublicacion) {
            if(codalq == "Si") {
                alert('El libro esta alquilado, no se puede alquilar nuevamnete');
            }  else {
                crearLibro(op);
                alert('Se creo el/la ' + op.tipo + 'con el codigo: ' + op.codigo);
            }
        } else {
            alert('Existen espacios sin llenar, porfavor llene todos');
        }
    } catch (error) {
        alert('Error al crear el/la ' + op.tipo + 'con el codigo: ' + op.codigo);
    }
}

export function ModificarLibro(cod: number) {

    let tip = (<HTMLInputElement>document.getElementById("tipo")).value.toString();
    let idcat = Number((<HTMLInputElement>document.getElementById("idcategoria")).value.toString());
    let edi = (<HTMLInputElement>document.getElementById("editorial")).value.toString();
    let nom = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
    let aut = (<HTMLInputElement>document.getElementById("autor")).value.toString();
    let anio = Number((<HTMLInputElement>document.getElementById("aniopublicacion")).value.toString());

    const op = new libro(cod, tip, idcat, edi, nom, aut, anio, "Actual", "Default");
    try {
        if (op.codigo && op.tipo && op.idcategoria && op.editorial && op.nombre && op.autor && op.aniopublicacion) {
            actualizarLibro(op);
            alert('Se actualizo el/la ' + op.tipo + 'con el codigo: ' + op.codigo);
        } else {
            alert('Existen espacios sin llenar, porfavor llene todos');
        }
    } catch (error) {
        alert('Error al actualizar el/la ' + op.tipo + 'con el codigo: ' + op.codigo);
    }
}

export function BorrarLibro(cod: number) {
    try {
        eliminarLibro(cod);
    } catch (error) {
        alert('Error al eliminar el libro con el codigo: ' + cod);
    }
}
