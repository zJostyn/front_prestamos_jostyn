import { estudiante } from "../templates/estudiante";

import { obtenerEstudiantes, crearEstudiante, actualizarEstudiante, eliminarEstudiante } from "../sql/estudiante";

let lestudiantes: estudiante[] = [];

export async function MostrarEstudiantes() {
    lestudiantes = await obtenerEstudiantes();

    let lis = "";
    let lista = <HTMLElement>document.getElementById("lista-estudiantes");
    if (lestudiantes.length > 0) {
        for (let i = 0; i < lestudiantes.length; i++) {
            lis = "<tr>" + lis + "<td>" + lestudiantes[i].cedula + "</td>" +
                "<td>" + lestudiantes[i].nombre + "</td>" +
                "<td>" + lestudiantes[i].apellido + "</td>" +
                "<td>" + lestudiantes[i].sexo + "</td>" +
                "<td>" + lestudiantes[i].fechanacimiento + "</td>" +
                "<td>" + lestudiantes[i].sancionado + "</td>" +
                `<td><button class="editar btn btn-warning" style="background: linear-gradient(90deg, #ffff57d8, #f69c01); color: black;">Editar</button> <button class="eliminar btn btn-danger" style="background: linear-gradient(90deg, #ff5757, #b60000);">Eliminar</button></td>` + "</tr>";
        }
    } else {
        lis = "<tr><td colspan='6'>No hay estudiantes registrados en la base de datos.</td></tr>";
    }
    lista.innerHTML = lis;
}

export async function MostrarEstudiantesPrestamos() {
    lestudiantes = await obtenerEstudiantes();

    let lista = <HTMLElement>document.getElementById("cedula");
    let elementos = '<option selected> Seleccione una opción</option>'
    for (let i = 0; i < lestudiantes.length; i++) {
        if(lestudiantes[i].sancionado == "Si") {
            elementos += '<option value = "Si" disabled style="color:red">' + "Cedula: " + lestudiantes[i].cedula + " Estudiante: " + lestudiantes[i].nombre + " " + lestudiantes[i].apellido + '</option>';
        } else {
            elementos += '<option value = "' + lestudiantes[i].cedula + '">' + "Cedula: " + lestudiantes[i].cedula + " Estudiante: " + lestudiantes[i].nombre + " " + lestudiantes[i].apellido + '</option>';
        }
    }
    lista.innerHTML = elementos;
}

export function IngresarEstudiante() {

    let ced = (<HTMLInputElement>document.getElementById("cedula")).value.toString();
    let nom = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
    let ape = (<HTMLInputElement>document.getElementById("apellido")).value.toString();
    let sex = (<HTMLInputElement>document.getElementById("sexo")).value.toString();
    let fecnac = (<HTMLInputElement>document.getElementById("fechanacimiento")).value.toString();

    const op = new estudiante(ced, nom, ape, sex, fecnac, "No");

    try {
        if (op.cedula && op.nombre && op.apellido && op.sexo && op.fechanacimiento) {
            if(op.cedula.length > 10 || op.cedula.length < 10) {
                alert("La cedula ingresada no contiene 10 digitos");
            } else {
                crearEstudiante(op);
                alert('El estudiante ingresado se acaba de crear correctamente!');
            }
        } else {
            alert('Existen espacios sin llenar, porfavor llene todos');
        }
    } catch (error) {
        alert('Error al crear el estudiante ingresado');
    }
}

export function ModificarEstudiante(ced: string) {

    let nom = (<HTMLInputElement>document.getElementById("nombre")).value.toString();
    let ape = (<HTMLInputElement>document.getElementById("apellido")).value.toString();
    let sex = (<HTMLInputElement>document.getElementById("sexo")).value.toString();
    let fecnac = (<HTMLInputElement>document.getElementById("fechanacimiento")).value.toString();
    let san = "Fijo";

    const op = new estudiante(ced, nom, ape, sex, fecnac, san);
    try {
        if (op.cedula && op.nombre && op.apellido && op.sexo && op.fechanacimiento) {
            actualizarEstudiante(op);
            alert('Se actualizo la persona con la cedula: ' + op.cedula);
        } else {
            alert('Existen espacios sin llenar, porfavor llene todos');
        }
    } catch (error) {
        alert('Error al actualizar datos de la cedula: ' + op.cedula);
    }
    localStorage.removeItem("editar");
}

export function BorrarEstudiante(cedula: string) {
    try {
        eliminarEstudiante(cedula);
        alert('Se elimino el estudiante con la cedula: '+ cedula);
    } catch (error) {
        alert('Error al eliminar el Estudiante');
    }
}


