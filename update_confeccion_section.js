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

// Imágenes de la categoría Confección a Medida
const confeccionImages = [
    'confeccion-a-medida-allikay.jpeg',
    'confeccion-a-medida-camisa-hombre.jpeg',
    'confeccion-a-medida-camiseta-doozzin.jpeg',
    'confeccion-a-medida-camiseta-eventos.jpeg',
    'confeccion-a-medida-camiseta.jpeg',
    'confeccion-a-medida-pastoral-caritas.jpeg',
    'confeccion-a-medida-restaurante.jpeg',
    'confeccion-a-medida-super-mercado-zaka.jpeg'
];

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

// Función para actualizar la sección de Confección a Medida
function updateConfeccionSection() {
    const catalogPath = path.join(__dirname, 'catalogo.html');
    let catalogContent = fs.readFileSync(catalogPath, 'utf8');
    
    // Generar el HTML de la sección de Confección a Medida
    let sectionHTML = `
        <!-- Sección de Productos - Confección a Medida -->
        <section id="confeccion-section" class="product-section">
            <div class="container">
                <h2 class="section-title">Confección a Medida</h2>
                <p class="section-subtitle">Productos personalizados según tus necesidades</p>
                <div class="catalog-grid">`;

    // Agregar las tarjetas de productos
    confeccionImages.forEach(image => {
        sectionHTML += '\n' + generateProductCard(image, 'confeccion-a-medida');
    });

    sectionHTML += `
                </div>
            </div>
        </section>`;
    
    // Buscar la sección de Confección a Medida existente o el marcador de inserción
    const sectionStart = catalogContent.indexOf('<!-- Sección de Productos - Confección a Medida -->');
    let newContent = '';
    
    if (sectionStart !== -1) {
        // Si la sección existe, reemplazarla
        const sectionEnd = catalogContent.indexOf('</section>', sectionStart) + 10; // +10 para incluir el tag de cierre
        newContent = catalogContent.substring(0, sectionStart) + 
                    sectionHTML + 
                    catalogContent.substring(sectionEnd);
    } else {
        // Si no existe, insertarla antes del cierre del contenedor de productos
        const containerEnd = catalogContent.indexOf('</div>', catalogContent.indexOf('<!-- Sección de Productos - Confección a Medida'));
        if (containerEnd !== -1) {
            newContent = catalogContent.substring(0, containerEnd) + 
                        sectionHTML + 
                        '\n            ' + catalogContent.substring(containerEnd);
        } else {
            console.error('No se pudo encontrar el contenedor de productos');
            return;
        }
    }
    
    // Hacer una copia de seguridad
    fs.writeFileSync(catalogPath + '.backup3', catalogContent);
    
    // Escribir el nuevo contenido
    fs.writeFileSync(catalogPath, newContent);
    
    console.log('Sección "Confección a Medida" actualizada exitosamente con ' + confeccionImages.length + ' productos.');
}

// Ejecutar la actualización
updateConfeccionSection();
