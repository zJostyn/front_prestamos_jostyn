import { Sidebar } from './components/pages/sidebar';
import { EstudiantePage } from './components/pages/estudiante';

window.addEventListener('DOMContentLoaded', () => {
    const sidebar = new Sidebar();
    sidebar.render();

    const content = new EstudiantePage();
    content.render();
});
