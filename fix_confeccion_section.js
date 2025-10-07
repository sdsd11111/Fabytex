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
        <section id="medida-section" class="product-section">
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
                
                <!-- Banner de servicio personalizado -->
                <div class="custom-order-banner">
                    <h3>¿Necesitas algo personalizado?</h3>
                    <p>¡Nosotros lo hacemos realidad! Contáctanos para solicitar un presupuesto sin compromiso.</p>
                    <a href="https://wa.me/593993076595?text=Hola%20Fabytex,%20estoy%20interesado%20en%20un%20producto%20personalizado" class="cta-button" target="_blank">
                        <i class="fab fa-whatsapp"></i> Solicitar Presupuesto
                    </a>
                </div>
            </div>
        </section>`;
    
    // Buscar la sección de Confección a Medida existente
    const sectionStart = catalogContent.indexOf('<!-- Sección de Confección a Medida -->');
    
    if (sectionStart !== -1) {
        // Si la sección existe, reemplazarla
        const sectionEnd = catalogContent.indexOf('</section>', sectionStart) + 10; // +10 para incluir el tag de cierre
        
        // Hacer una copia de seguridad
        fs.writeFileSync(catalogPath + '.backup4', catalogContent);
        
        // Reemplazar el contenido
        const newContent = catalogContent.substring(0, sectionStart) + 
                         sectionHTML + 
                         catalogContent.substring(catalogContent.indexOf('</section>', sectionEnd));
        
        // Escribir el nuevo contenido
        fs.writeFileSync(catalogPath, newContent);
        
        console.log('Sección "Confección a Medida" actualizada exitosamente con ' + confeccionImages.length + ' productos.');
    } else {
        console.error('No se pudo encontrar la sección de Confección a Medida en el archivo.');
    }
}

// Ejecutar la actualización
updateConfeccionSection();
