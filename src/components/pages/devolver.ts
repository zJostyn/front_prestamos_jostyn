import { MostrarLibrosDevolucion } from "../controllers/libros";
import { MostrarEstudiantesPrestamos } from "../controllers/estudiantes";

import { DevolverLibro, DevolverLibroTabla, obtenerFechaEntrega} from "../controllers/prestamos";

export class DevolverPage {
    render() {
        const content = document.getElementById('content')!;
        content.innerHTML = `
            <h1>Devolver Libro</h1>
            <form id="devolver-form">
                <label>Estudiante:<select id="cedula"></select></label>
                <label>Codigo Libro:<select id="codigo"></select></label>
                <label>Fecha Devuelto:<input type="date" id="fechadevuelto"></label>
                <button id="btn">Devolver</button>
            </form>
        `;

        MostrarEstudiantesPrestamos();
        MostrarLibrosDevolucion();

        let cedula = "";
        let codigo = 0;
        let fecent = "";
        let option = "";
        const devolverTablaExiste = JSON.parse(localStorage.getItem("devolvertabla") || "null");

        if(devolverTablaExiste != null) {
            console.log("Esta entrando a devolvertabla")
            option = 'devolvertabla';
            cedula = devolverTablaExiste.cedula;
            codigo = devolverTablaExiste.codigo;
            fecent = devolverTablaExiste.fechaentrega;

            setTimeout(() => {
                (<HTMLInputElement>document.getElementById("cedula")).value = devolverTablaExiste.cedula;
            }, 250);
            setTimeout(() => {
                (<HTMLInputElement>document.getElementById("codigo")).value = devolverTablaExiste.codigo;
            }, 250);

            (<HTMLInputElement>document.getElementById("cedula")).disabled = true;
            (<HTMLInputElement>document.getElementById("codigo")).disabled = true;

        } else {
            console.log("No esta para devolver en la tabla");
        }

        // Evento para agregar o modificar
        document.getElementById('devolver-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (option == 'devolvertabla' && devolverTablaExiste != null) {
                DevolverLibroTabla(cedula, codigo, fecent);
                Clear();
                localStorage.removeItem("devolvertabla");
                window.location.href = '#prestamo';
                option = "";
            } else {
                let ced = (<HTMLInputElement>document.getElementById("cedula")).value.toString();
                let cod = Number((<HTMLInputElement>document.getElementById("codigo")).value.toString());
                obtenerFechaEntrega(ced, cod);
                DevolverLibro(ced, cod);
                Clear();
                option = "";
            }
        });

        function Clear() {
            (<HTMLInputElement>document.getElementById("codigo")).value = '';
            (<HTMLInputElement>document.getElementById("cedula")).value = '';
            (<HTMLInputElement>document.getElementById("fechadevuelto")).value = '';
            (<HTMLInputElement>document.getElementById("cedula")).disabled = false;
            (<HTMLInputElement>document.getElementById("codigo")).disabled = false;

        }
    }
}
