export class Sidebar {
  render() {
    const sidebar = document.getElementById('sidebar')!;
    sidebar.innerHTML = `
      <ul>
        <li><a href="#estudiante" id="estudiantes-link">Estudiantes</a></li>
        <li><a href="#libro" id="libros-link">Libros</a></li>
        <li><a href="#prestamo" id="prestamos-link">Préstamos</a></li>
        <li><a href="#devolver" id="devolver-link">Devolver Libro</a></li>
      </ul>
    `;

    // Agregar los listeners a los enlaces
    document.getElementById('estudiantes-link')?.addEventListener('click', () => this.loadPage('estudiante', 'estudiantes-link'));
    document.getElementById('libros-link')?.addEventListener('click', () => this.loadPage('libro', 'libros-link'));
    document.getElementById('prestamos-link')?.addEventListener('click', () => this.loadPage('prestamo', 'prestamos-link'));
    document.getElementById('devolver-link')?.addEventListener('click', () => this.loadPage('devolver', 'devolver-link'));

    // Cargar la página actual al cargar la vista
    const currentPage = window.location.hash || '#estudiante';
    this.loadPage(currentPage.slice(1), this.getLinkIdFromHash(currentPage)); // Actualiza la página inicial

    // Escuchar los cambios en el hash
    window.addEventListener('hashchange', () => {
      const newPage = window.location.hash || '#estudiante';
      console.log('Hash actual:', newPage);
      this.loadPage(newPage.slice(1), this.getLinkIdFromHash(newPage));
    });
    
  }

  getLinkIdFromHash(hash: string): string {
    switch (hash) {
      case '#libro':
        return 'libros-link';
      case '#prestamo':
        return 'prestamos-link';
      case '#devolver':
        return 'devolver-link';
      default:
        return 'estudiantes-link';
    }
  }

  setActiveLink(activeLinkId: string) {
    console.log('Marcando como activo:', activeLinkId);
  
    const links = document.querySelectorAll('aside#sidebar ul li a');
    links.forEach(link => link.classList.remove('active'));
  
    const activeLink = document.getElementById(activeLinkId);
    if (activeLink) {
      activeLink.classList.add('active');
      console.log('Clase "active" añadida al enlace:', activeLink);
    } else {
      console.warn('No se encontró el enlace con ID:', activeLinkId);
    }
  }
  

  loadPage(page: string, linkId: string) {
    console.log('Cargando página:', page, 'LinkId:', linkId);
    import(`../components/pages/${page}.ts`)
      .then((module) => {
        const PageClass = module[Object.keys(module)[0]];
        const content = new PageClass();
        const contentContainer = document.getElementById('content')!;
        contentContainer.innerHTML = '';
        content.render();
  
        localStorage.removeItem('devolvertabla');
        this.setActiveLink(linkId);
      })
      .catch((error) => {
        console.error(`Error al cargar el módulo ${page}:`, error);
      });
  }
  
}
