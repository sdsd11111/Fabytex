const fs = require('fs');
const path = require('path');

// Función para formatear el título
function formatTitle(str) {
    return str
        .replace(/[-_]/g, ' ') // Reemplazar guiones y guiones bajos por espacios
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .replace(/\b(De|Y|Para|En|Loja|Del|La|El|Los|Las|Un|Una|Unos|Unas|Al|Lo)\b/gi, 
                word => word.toLowerCase()) // Poner en minúsculas las palabras cortas
        .replace(/^./, str => str.toUpperCase()); // Primera letra en mayúscula
}

// Mapeo de categorías
const categories = {
    'moda-femenina': {
        sectionId: 'moda-femenina-section',
        title: 'Moda Femenina',
        images: [
            'moda-femenina-chaleco-de-mujer.jpeg',
            'moda-femenina-chaleco.jpeg',
            'moda-femenina-detalles.jpeg'
        ]
    },
    'uniformes-y-trabajo': {
        sectionId: 'uniformes-section',
        title: 'Uniformes y Trabajo',
        images: [
            'uniformes-y-trabajo-distintos-trabajos.jpeg',
            'uniformes-y-trabajo-estilista.jpeg',
            'uniformes-y-trabajo-municipio.jpeg',
            'uniformes-y-trabajo-otros-trabajos.jpeg',
            'uniformes-y-trabajo-peluquera.jpeg',
            'uniformes-y-trabajo-todo-tapado-azul.jpeg',
            'uniformes-y-trabajo-todo-tapado-rojo.jpeg',
            'uniformes-y-trabajo-trabajo-manuales.jpeg',
            'uniformes-y-trabajo-uniforme-escolar.jpeg',
            'uniformes-y-trabajo-veterinaria.jpeg'
        ]
    },
    'indumentaria-medica': {
        sectionId: 'medica-section',
        title: 'Indumentaria Médica',
        images: [
            'Trajes Medicos y de Enfermeria Loja.jpg',
            'indumentaria-medica-manga-corta.jpeg',
            'indumentaria-medica-odontologo.jpeg',
            'indumentaria-medica-para-hombres.jpeg',
            'indumentaria-medica-para-mujeres-blanco.jpeg',
            'indumentaria-medica-para-mujeres-cafe.jpeg',
            'indumentaria-medica-para-mujeres-odontologia.jpeg',
            'indumentaria-medica-para-mujeres.jpeg'
        ]
    },
    'deportiva-y-pijameria': {
        sectionId: 'deportiva-section',
        title: 'Ropa Deportiva y Pijamería',
        images: [
            'Outfits de Yoga y Gimnasio Loja.jpg',
            'deportiva-y-pijameria-chaleco-deportivo.jpeg',
            'deportiva-y-pijameria-para-hombres-camisetas.jpeg',
            'deportiva-y-pijameria-para-hombres.jpeg',
            'deportiva-y-pijameria.jpg'
        ]
    },
    'confeccion-a-medida': {
        sectionId: 'confeccion-section',
        title: 'Confección a Medida',
        images: [
            'confeccion-a-medida-allikay.jpeg',
            'confeccion-a-medida-camisa-hombre.jpeg',
            'confeccion-a-medida-camiseta-doozzin.jpeg',
            'confeccion-a-medida-camiseta-eventos.jpeg',
            'confeccion-a-medida-camiseta.jpeg',
            'confeccion-a-medida-pastoral-caritas.jpeg',
            'confeccion-a-medida-restaurante.jpeg',
            'confeccion-a-medida-super-mercado-zaka.jpeg'
        ]
    }
};

// Función para generar el HTML de una tarjeta de producto
function generateProductCard(imageName, category) {
    const title = formatTitle(imageName.replace(/\.[^.]+$/, '').replace(new RegExp(`^${category}-?`, 'i'), ''));
    const imagePath = `images/catalogo/${imageName}`;
    
    return `
                        <!-- ${title} -->
                        <div class="product-card" data-category="${category}">
                            <div class="product-header">
                                <div class="product-badge">Nuevo</div>
                                <div class="product-image">
                                    <img src="${imagePath}" alt="${title}" loading="lazy">
                                </div>
                            </div>
                            <div class="product-body">
                                <h3 class="product-title">${title}</h3>
                                <p class="product-description">${title} de alta calidad. Contáctanos para más información sobre este producto.</p>
                                <div class="product-actions">
                                    <a href="https://wa.me/593993076595?text=Hola%20Fabytex,%20estoy%20interesado%20en%20${encodeURIComponent(title)}" class="btn btn-primary" target="_blank">
                                        <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>`.trim();
}

// Función para actualizar la sección "Todos"
function updateAllSection() {
    const catalogPath = path.join(__dirname, 'catalogo.html');
    let catalogContent = fs.readFileSync(catalogPath, 'utf8');
    
    // Generar el HTML de la sección "Todos"
    let allSectionHTML = `
        <!-- Sección de Productos - Todos -->
        <section id="all-section" class="product-section">
            <div class="container">
                <h2 class="section-title">Todos Nuestros Productos</h2>
                <p class="section-subtitle">Descubre nuestra amplia gama de productos de calidad</p>
                <div class="catalog-grid">`;

    // Agregar las tarjetas de productos de todas las categorías
    Object.entries(categories).forEach(([category, data]) => {
        data.images.forEach(image => {
            allSectionHTML += '\n' + generateProductCard(image, category);
        });
    });

    allSectionHTML += `
                </div>
            </div>
        </section>`;
    
    // Encontrar la sección "Todos" existente
    const sectionStart = catalogContent.indexOf('<!-- Sección de Productos - Todos -->');
    if (sectionStart === -1) {
        console.error('No se encontró la sección "Todos"');
        return;
    }
    
    const sectionEnd = catalogContent.indexOf('</section>', sectionStart) + 10; // +10 para incluir el tag de cierre
    
    // Reemplazar la sección antigua con la nueva
    const newContent = catalogContent.substring(0, sectionStart) + 
                      allSectionHTML + 
                      catalogContent.substring(sectionEnd);
    
    // Hacer una copia de seguridad
    fs.writeFileSync(catalogPath + '.backup2', catalogContent);
    
    // Escribir el nuevo contenido
    fs.writeFileSync(catalogPath, newContent);
    
    console.log('Sección "Todos" actualizada exitosamente con todos los productos.');
}

// Ejecutar la actualización
updateAllSection();
