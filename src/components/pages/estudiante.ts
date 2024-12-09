import { MostrarEstudiantes, IngresarEstudiante, ModificarEstudiante, BorrarEstudiante } from "../controllers/estudiantes";

export class EstudiantePage {
    render() {

        const content = document.getElementById('content')!;
        content.innerHTML = `
            <h1>Administración de Estudiantes</h1>
            <button id="btn-add">Agregar Estudiante</button>
            <table border="1" id="tabla-estudiantes">
                <thead>
                    <tr>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Sexo</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Sancionado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-estudiantes">
                </tbody>
            </table>

            <div id="modal" class="modal">
                <h2>Agregar un Estudiante</h2>
                <form id="estudiante-form">
                    <input type="text" id="cedula" placeholder="Cédula" required />
                    <input type="text" id="nombre" placeholder="Nombre" required />
                    <input type="text" id="apellido" placeholder="Apellido" required />
                    <label>Sexo:
                        <select id="sexo">
                            <option value="">Escoja el sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </label>
                    <label>Fecha Nacimiento:
                        <input type="date" id="fechanacimiento">
                    </label>
                    <button type="submit">Guardar</button>
                </form>
            </div>
            <div id="modal-overlay" class="modal-overlay"></div>
        `;
        //Cargar Estudiantes Al Inicio
        MostrarEstudiantes();

        const modal = document.getElementById('modal')!;
        const overlay = document.getElementById('modal-overlay')!;
        const tabla = document.getElementById("tabla-estudiantes") as HTMLTableElement;

        let id = '';
        let option = '';

        // Mostrar el modal al hacer clic en agregar
        document.getElementById('btn-add')?.addEventListener('click', () => {
            modal.classList.add('active');
            overlay.classList.add('active');
            option = 'Add';
        });

        // Mostrar el modal al hacer clic en editar
        tabla.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
            if (target.classList.contains("editar")) {
                modal.classList.add('active');
                overlay.classList.add('active');
                const fila = parent;
                id = fila.children[0].innerHTML;
                option = "Update";
                (<HTMLInputElement>document.getElementById("cedula")).value = fila.children[0].innerHTML;
                (<HTMLInputElement>document.getElementById("nombre")).value = fila.children[1].innerHTML;
                (<HTMLInputElement>document.getElementById("apellido")).value = fila.children[2].innerHTML;
                (<HTMLInputElement>document.getElementById("sexo")).value = fila.children[3].innerHTML;
                (<HTMLInputElement>document.getElementById("fechanacimiento")).value = fila.children[4].innerHTML;        
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
        document.getElementById('estudiante-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            overlay.classList.remove('active');
            if (option == 'Add') {
                IngresarEstudiante();
                MostrarEstudiantes();
                Clear();
            } else if (option == 'Update'){
                ModificarEstudiante(id);
                MostrarEstudiantes();
                Clear();
            }
        });

        // Agregar evento de estudiante al dar click en Eliminar
        tabla.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
            if (target.classList.contains("eliminar")) {
                const fila = parent;
                id = fila.children[0].innerHTML;
                BorrarEstudiante(id);
                MostrarEstudiantes();
                id = '';
            }
        });

        function Clear() {
            (<HTMLInputElement>document.getElementById("cedula")).value = '';
            (<HTMLInputElement>document.getElementById("nombre")).value = '';
            (<HTMLInputElement>document.getElementById("apellido")).value = '';
            (<HTMLInputElement>document.getElementById("sexo")).value = '';
            (<HTMLInputElement>document.getElementById("fechanacimiento")).value = '';
        }
    }
}
