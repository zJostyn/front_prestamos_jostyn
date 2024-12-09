import { MostrarCategorias } from "../controllers/categorias";

import { MostrarTodos, MostrarLibros, MostrarRevistas, IngresarLibro, ModificarLibro, BorrarLibro } from "../controllers/libros";

export class LibroPage {
    render() {

        const content = document.getElementById('content')!;
        content.innerHTML = `
            <h1>Administración de Libros</h1>
            <select id="filter-select">
                <option value="todos" selected>Todos</option>
                <option value="libros">Libros</option>
                <option value="revistas">Revistas</option>
            </select>
            <button id="btn-add">Agregar Libro</button>
            <table border="1" id="tabla-libros">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Editorial</th>
                        <th>Nombre</th>
                        <th>Autor</th>
                        <th>Año Publicacion</th>
                        <th>Alquilado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="lista-libros">
                </tbody>
            </table>

            <div id="modal" class="modal">
                <h2>Agregar un Libro</h2>
                <form id="libro-form">
                    <input type="text" id="codigo" placeholder="Codigo" required />
                    <label>Tipo:
                        <select id="tipo">
                        <option selected>Escoje un Tipo</option>
                        <option value="Libro">Libro</option>
                        <option value="Revista">Revista</option>
                        </select>
                    </label>
                    <label>Categoria:
                        <select id="idcategoria">
                        </select>
                    </label>
                    <input type="text" id="editorial" placeholder="Editorial" required />
                    <input type="text" id="nombre" placeholder="Nombre" required />
                    <input type="text" id="autor" placeholder="Autor" required />
                    <input type="text" id="aniopublicacion" placeholder="Año de Publicación" required />
                    <button type="submit">Guardar</button>
                </form>
            </div>
            <div id="modal-overlay" class="modal-overlay"></div>
        `;
        //Cargar Categorias, Libros y Revistas Al Inicio
        MostrarCategorias();
        MostrarTodos();

        //Cargar Todos, Libros o Revistas Al Escoger
        const filterSelect = document.getElementById('filter-select') as HTMLSelectElement;
        filterSelect.addEventListener('change', (event) => {
            const selectedValue = (event.target as HTMLSelectElement).value;
    
            switch (selectedValue) {
                case 'libros':
                    MostrarLibros();
                    break;
                case 'revistas':
                    MostrarRevistas();
                    break;
                default:
                    MostrarTodos();
                    break;
            }
        });

        const modal = document.getElementById('modal')!;
        const overlay = document.getElementById('modal-overlay')!;
        const tabla = document.getElementById("tabla-libros") as HTMLTableElement;

        let id = 0;
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
                id = Number(fila.children[0].innerHTML);
                option = "Update";
                (<HTMLInputElement>document.getElementById("codigo")).value = fila.children[0].innerHTML;
                (<HTMLInputElement>document.getElementById("tipo")).value = fila.children[1].innerHTML;
                (<HTMLInputElement>document.getElementById("idcategoria")).value = String(fila.children[2].getAttribute('data-id'));
                (<HTMLInputElement>document.getElementById("editorial")).value = fila.children[3].innerHTML;
                (<HTMLInputElement>document.getElementById("nombre")).value = fila.children[4].innerHTML;
                (<HTMLInputElement>document.getElementById("autor")).value = fila.children[5].innerHTML;
                (<HTMLInputElement>document.getElementById("aniopublicacion")).value = fila.children[6].innerHTML;        
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
        document.getElementById('libro-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            overlay.classList.remove('active');
            if (option == 'Add') {
                IngresarLibro();
                MostrarTodos();
                Clear();
            } else if (option == 'Update'){
                ModificarLibro(id);
                MostrarTodos();
                Clear();
            }
        });

        // Agregar evento de estudiante al dar click en Eliminar
        tabla.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            let parent = (<HTMLElement>(<HTMLElement>event.target).parentNode?.parentNode);
            if (target.classList.contains("eliminar")) {
                const fila = parent;
                id = Number(fila.children[0].innerHTML);
                BorrarLibro(id);
                MostrarTodos();
                id = 0;
            }
        });

        function Clear() {
            (<HTMLInputElement>document.getElementById("codigo")).value = '';
            (<HTMLInputElement>document.getElementById("tipo")).value = '';
            (<HTMLInputElement>document.getElementById("idcategoria")).value = '';
            (<HTMLInputElement>document.getElementById("editorial")).value = '';
            (<HTMLInputElement>document.getElementById("nombre")).value = '';
            (<HTMLInputElement>document.getElementById("autor")).value = '';
            (<HTMLInputElement>document.getElementById("aniopublicacion")).value = '';
        }
    }
}
