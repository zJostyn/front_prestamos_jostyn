import { MostrarEstudiantesPrestamos } from "../controllers/estudiantes";
import { MostrarLibrosPrestamos } from "../controllers/libros";

import { MostrarPrestamos, IngresarPrestamo } from "../controllers/prestamos";


export class PrestamoPage {
    render() {

        const content = document.getElementById('content')!;
        content.innerHTML = `
            <h1>Administración de Prestamos</h1>
            <button id="btn-add">Agregar Prestamo</button>
            <table border="1" id="tabla-prestamos">
                <thead>
                    <tr>
                        <th>IdPrestamo</th>
                        <th>Cedula</th>
                        <th>Codigo</th>
                        <th>Fecha Prestamo</th>
                        <th>Fecha Entrega</th>
                        <th>Fecha Devuelto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-prestamos">
                </tbody>
            </table>

            <div id="modal" class="modal">
                <h2>Agregar Prestamo</h2>
                <form id="prestamo-form">
                    <input type="text" id="idprestamo" placeholder="Codigo Prestamo" required />
                    <label>Cedula:
                        <select id="cedula">
                        </select>
                    </label>
                    <label>Codigo Libro:
                        <select id="codigo">
                        </select>
                    </label>
                    <label>Fecha Prestamo:
                        <input type="date" id="fechaprestamo">
                    </label>
                    <label>Fecha Entrega:
                        <input type="date" id="fechaentrega">
                    </label>
                    <button type="submit">Guardar</button>
                </form>
            </div>
            <div id="modal-overlay" class="modal-overlay"></div>
        `;
        //Cargar Estudiantes Al Inicio
        MostrarPrestamos();
        MostrarEstudiantesPrestamos();
        MostrarLibrosPrestamos();
        
        const modal = document.getElementById('modal')!;
        const overlay = document.getElementById('modal-overlay')!;
        const tabla = document.getElementById("tabla-prestamos") as HTMLTableElement;

        let option = '';

        // Mostrar el modal al hacer clic en agregar
        document.getElementById('btn-add')?.addEventListener('click', () => {
            modal.classList.add('active');
            overlay.classList.add('active');
            option = 'Add';
        });

        // Enviar al Devolver con Datos de la Tabla
        tabla.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
            if (target.classList.contains("devolvertabla")) {
                const fila = parent;
                const prestamo = {
                    cedula: fila.children[1].innerHTML,
                    codigo: Number(fila.children[2].innerHTML),
                    fechaentrega: fila.children[4].innerHTML
                }

                localStorage.setItem("devolvertabla", JSON.stringify(prestamo));

                window.location.href = '#devolver';
            }
        });

        // Evitar cierre del modal al hacer clic dentro del modal
        modal.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Cerrar el modal al hacer clic en el fondo del overlay
        overlay.addEventListener('click', () => {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        });

        // Evento para agregar o modificar
        document.getElementById('prestamo-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            overlay.classList.remove('active');
            if (option == 'Add') {
                IngresarPrestamo();
                MostrarPrestamos();
            }
        });
    }
}
