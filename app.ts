import { Sidebar } from './src/components/pages/sidebar';
import { EstudiantePage } from './src/components/pages/estudiante';

window.addEventListener('DOMContentLoaded', () => {
    const sidebar = new Sidebar();
    sidebar.render();

    const content = new EstudiantePage();
    content.render();
});
