import { prestamo } from "../templates/prestamo";

import { obtenerPrestamos, crearPrestamo, devolverLibro } from "../sql/prestamo";

import { colocarEstadoAlquiladoLibro, colocarEstadoNoAlquiladoLibro } from "../sql/libro";

import { sancionarEstudiante } from "../sql/estudiante";

let lprestamos: prestamo[] = [];

export async function MostrarPrestamos() {
    lprestamos = await obtenerPrestamos();

    let lis = "";
    let lista = <HTMLElement>document.getElementById("lista-prestamos");
    if (lprestamos.length > 0) {
        for (let i = 0; i < lprestamos.length; i++) {
            if(lprestamos[i].fechadevuelto == null ||  lprestamos[i].fechadevuelto == "")  {
                lis = "<tr>" + lis + "<td>" + lprestamos[i].idprestamo + "</td>" +
                "<td>" + lprestamos[i].cedula + "</td>" +
                "<td>" + lprestamos[i].codigo + "</td>" +
                "<td>" + lprestamos[i].fechaprestamo + "</td>" +
                "<td>" + lprestamos[i].fechaentrega + "</td>" +
                "<td>" + (lprestamos[i].fechadevuelto ? lprestamos[i].fechadevuelto : "No Devuelto") + "</td>" +
                `<td><button class="devolvertabla btn btn-warning" style="background: linear-gradient(90deg, #57ff5ad8, #32f601da); color: white;">Devolver</button></td>` +
                "</tr>";
            } else {
                lis = "<tr>" + lis + "<td>" + lprestamos[i].idprestamo + "</td>" +
                "<td>" + lprestamos[i].cedula + "</td>" +
                "<td>" + lprestamos[i].codigo + "</td>" +
                "<td>" + lprestamos[i].fechaprestamo + "</td>" +
                "<td>" + lprestamos[i].fechaentrega + "</td>" +
                "<td>" + lprestamos[i].fechadevuelto + "</td>" +
                `<td> Devuelto </td>` +
                "</tr>";
            }
        }
    } else {
        lis = "<tr><td colspan='6'>No hay préstamos registrados</td></tr>";
    }
    lista.innerHTML = lis;
}

export async function obtenerFechaEntrega(cedula:string, codigo:number) {
    lprestamos = await obtenerPrestamos();
    for (let i = 0; i < lprestamos.length; i++) {
        if (lprestamos[i].cedula == cedula && lprestamos[i].codigo == codigo) {
            if (lprestamos[i].fechadevuelto == null || lprestamos[i].fechadevuelto == "" ) {
                localStorage.setItem('fechaentrega', lprestamos[i].fechaentrega);
            }
        }

    }
}

export async function IngresarPrestamo() {

    let idpre = Number((<HTMLInputElement>document.getElementById("idprestamo")).value.toString());
    let ced = (<HTMLInputElement>document.getElementById("cedula")).value.toString();
    let cod = Number((<HTMLInputElement>document.getElementById("codigo")).value.toString());
    let codalq = (<HTMLInputElement>document.getElementById("codigo")).value.toString();
    let fecpre = (<HTMLInputElement>document.getElementById("fechaprestamo")).value.toString();
    let fecent = (<HTMLInputElement>document.getElementById("fechaentrega")).value.toString();

    const op = new prestamo(idpre, ced, cod, fecpre, fecent, "");
    console.log(codalq);
    try {
        if(codalq == "Si" ) {
            alert('El libro ingresado ya esta alquilado');
        } else {
            if (op.idprestamo && op.cedula && op.codigo && op.fechaprestamo && op.fechaentrega) {
                if (op.cedula != "Si") {
                    crearPrestamo(op);
                    colocarEstadoAlquiladoLibro(cod);
                    alert('Se Inserto el Prestamo');
                } else {
                    alert('El estudiante ingresado esta sancionado por 15d');
                }
            } else {
                alert('Debe llenar todos los espacios');
            }
        }
    } catch (error) {
        alert('Error al crear el Prestamo');
    }
}


export function DevolverLibro(ced:string, cod:number) {

    const fechaentregarecibida = localStorage.getItem("fechaentrega") || "[]";
    let fecdev = (<HTMLInputElement>document.getElementById("fechadevuelto")).value.toString();
    const op = new prestamo(0, ced, cod, "Ya Existente", fechaentregarecibida, fecdev);
    try {
        if (op.codigo && op.cedula && op.fechadevuelto) {
            console.log(fechaentregarecibida);
            if (verificarFechaExcedida(op.fechaentrega, op.fechadevuelto)) {
                sancionarEstudiante(ced, 'Si');
                devolverLibro(op);
                colocarEstadoNoAlquiladoLibro(cod);
                alert('Se devolvio el libro pero la cedula: ' + op.cedula + 'recibio una sancion de 15d');
            } else {
                devolverLibro(op);
                colocarEstadoNoAlquiladoLibro(cod);
                alert('Se devolvio el libro con el codigo: ' + op.codigo);
            }
        } else {
            alert('Existen espacios sin llenar, porfavor llene todos');
        }
    } catch (error) {
        alert('Error al devolver el libro con el codigo: ' + op.codigo);
    }
}

export function DevolverLibroTabla(ced: string, cod: number, fecent: string) {

    let fecdev = (<HTMLInputElement>document.getElementById("fechadevuelto")).value.toString();

    const op = new prestamo(0, ced, cod, "Ya Existente", fecent, fecdev);
    try {
        if (op.fechadevuelto) {
            if (verificarFechaExcedida(op.fechaentrega, op.fechadevuelto)) {
                sancionarEstudiante(ced, 'Si');
                devolverLibro(op);
                colocarEstadoNoAlquiladoLibro(cod);
                alert('Se devolvio el libro pero la cedula: ' + op.cedula + 'recibio una sancion de 15d');
            } else {
                devolverLibro(op);
                colocarEstadoNoAlquiladoLibro(cod);
                alert('Se devolvio el libro con el codigo: ' + op.codigo);
            }
        } else {
            alert('La fecha de devolucion esta vacia, porfavor elija una!');
        }
    } catch (error) {
        alert('Error al devolver el libro con el codigo: ' + op.codigo);
    }
}

export function verificarFechaExcedida(fecent: string, fecdev: string): boolean {
    const entrega = new Date(fecent);
    const devolucion = new Date(fecdev);

    const milisegundos = devolucion.getTime() - entrega.getTime();

    const dias = milisegundos / (1000 * 60 * 60 * 24);

    if (dias > 0) {
        return true;
    } else {
        return false;
    }
}


