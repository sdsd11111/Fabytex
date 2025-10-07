const fs = require('fs');
const path = require('path');

// Función para formatear el título
function formatTitle(str) {
    return str.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

// Mapeo de categorías
const categories = {
    'moda-femenina': {
        sectionId: 'moda-femenina-section',
        title: 'Moda Femenina',
        subtitle: 'Descubre nuestra colección de moda para mujer',
        images: [
            'moda-femenina-chaleco-de-mujer.jpeg',
            'moda-femenina-chaleco.jpeg',
            'moda-femenina-detalles.jpeg'
        ]
    },
    'uniformes-y-trabajo': {
        sectionId: 'uniformes-section',
        title: 'Uniformes y Trabajo',
        subtitle: 'Ropa de trabajo duradera y profesional',
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
        subtitle: 'Especialmente diseñada para profesionales de la salud',
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
        subtitle: 'Comodidad para estar activo o relajado',
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
        subtitle: 'Diseños personalizados para tus necesidades',
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
    const title = formatTitle(imageName.replace(/\.\w+$/, '').replace(new RegExp(`^${category}-?`, 'i'), ''));
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

// Función para generar el HTML de una sección completa
function generateSection(category, data) {
    const { sectionId, title, subtitle, images } = data;
    
    let sectionHTML = `
        <!-- Sección de ${title} -->
        <section id="${sectionId}" class="product-section">
            <div class="container">
                <h2 class="section-title">${title}</h2>
                <p class="section-subtitle">${subtitle}</p>
                <div class="catalog-grid" id="${category}-grid">`;

    // Agregar las tarjetas de productos
    images.forEach(image => {
        sectionHTML += '\n' + generateProductCard(image, category);
    });

    sectionHTML += `
                </div>
            </div>
        </section>`;

    return sectionHTML;
}

// Leer el archivo catalogo.html
const catalogPath = path.join(__dirname, 'catalogo.html');
let catalogContent = fs.readFileSync(catalogPath, 'utf8');

// Generar el HTML de todas las secciones
let newSections = '';
Object.entries(categories).forEach(([category, data]) => {
    newSections += generateSection(category, data) + '\n\n';
});

// Reemplazar el contenido entre los marcadores de sección
const startMarker = '<!-- INICIO DE SECCIONES DE PRODUCTOS -->';
const endMarker = '<!-- FIN DE SECCIONES DE PRODUCTOS -->';

const startIndex = catalogContent.indexOf(startMarker);
const endIndex = catalogContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const beforeSections = catalogContent.substring(0, startIndex + startMarker.length);
    const afterSections = catalogContent.substring(endIndex);
    
    const newContent = `${beforeSections}\n\n${newSections}\n        ${afterSections}`;
    
    // Hacer una copia de seguridad
    fs.writeFileSync(catalogPath + '.backup', catalogContent);
    
    // Escribir el nuevo contenido
    fs.writeFileSync(catalogPath, newContent);
    
    console.log('¡Catálogo actualizado exitosamente!');
} else {
    console.error('No se encontraron los marcadores de sección en el archivo.');
}
