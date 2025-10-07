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
function generateProductCard(imageName) {
    const title = formatTitle(imageName
        .replace(/\.jpe?g$/, '') // Eliminar extensión .jpg o .jpeg
        .replace(/^confeccion-a-medida-?/i, '') // Eliminar prefijo
    );
    
    return `
                    <div class="product-card" data-category="confeccion-a-medida">
                        <div class="product-header">
                            <div class="product-badge">Nuevo</div>
                            <div class="product-image">
                                <img src="images/catalogo/${imageName}" alt="${title}" loading="lazy">
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
                    </div>`;
}

function addConfeccionCards() {
    const catalogPath = path.join(__dirname, 'catalogo.html');
    let catalogContent = fs.readFileSync(catalogPath, 'utf8');
    
    // Generar el HTML de todas las tarjetas
    const cardsHTML = confeccionImages.map(img => generateProductCard(img)).join('\n');
    
    // Encontrar la posición donde insertar las tarjetas (dentro del div.catalog-grid de la sección de Confección)
    const sectionStart = catalogContent.indexOf('id="medida-section"');
    const gridStart = catalogContent.indexOf('<div class="catalog-grid">', sectionStart);
    const gridEnd = catalogContent.indexOf('</div>', gridStart) + 6; // +6 para incluir el </div>
    
    // Crear el nuevo contenido del grid
    const newGridContent = `
                <div class="catalog-grid">
                    ${cardsHTML}
                </div>`;
    
    // Reemplazar solo el contenido del grid
    const newContent = catalogContent.substring(0, gridStart) + 
                      newGridContent + 
                      catalogContent.substring(gridEnd);
    
    // Hacer una copia de seguridad
    fs.writeFileSync(catalogPath + '.backup9', catalogContent);
    
    // Escribir el nuevo contenido
    fs.writeFileSync(catalogPath, newContent);
    
    console.log('Tarjetas de Confección a Medida agregadas correctamente.');
}

addConfeccionCards();
