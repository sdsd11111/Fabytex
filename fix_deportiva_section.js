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

// Imágenes de la categoría Deportiva y Pijamería
const deportivaImages = [
    'Outfits de Yoga y Gimnasio Loja.jpg',
    'deportiva-y-pijameria-chaleco-deportivo.jpeg',
    'deportiva-y-pijameria-para-hombres-camisetas.jpeg',
    'deportiva-y-pijameria-para-hombres.jpeg',
    'deportiva-y-pijameria.jpg'
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

// Función para actualizar la sección de Deportiva y Pijamería
function updateDeportivaSection() {
    const catalogPath = path.join(__dirname, 'catalogo.html');
    let catalogContent = fs.readFileSync(catalogPath, 'utf8');
    
    // Generar el HTML de la sección de Deportiva y Pijamería
    let sectionHTML = `
        <!-- Sección de Ropa Deportiva y Pijamería -->
        <section id="deportiva-section" class="product-section">
            <div class="container">
                <h2 class="section-title">Ropa Deportiva y Pijamería</h2>
                <p class="section-subtitle">Comodidad para estar activo o relajado</p>
                <div class="catalog-grid" id="deportiva-y-pijameria-grid">`;

    // Agregar las tarjetas de productos
    deportivaImages.forEach(image => {
        sectionHTML += '\n' + generateProductCard(image, 'deportiva-y-pijameria');
    });

    sectionHTML += `
                </div>
            </div>
        </section>`;
    
    // Buscar la sección de Deportiva y Pijamería existente
    const sectionStart = catalogContent.indexOf('<!-- Sección de Ropa Deportiva y Pijamería -->');
    
    if (sectionStart !== -1) {
        // Si la sección existe, reemplazarla
        const sectionEnd = catalogContent.indexOf('</section>', sectionStart) + 10; // +10 para incluir el tag de cierre
        
        // Hacer una copia de seguridad
        fs.writeFileSync(catalogPath + '.backup5', catalogContent);
        
        // Reemplazar el contenido
        const newContent = catalogContent.substring(0, sectionStart) + 
                         sectionHTML + 
                         catalogContent.substring(catalogContent.indexOf('</section>', sectionEnd));
        
        // Escribir el nuevo contenido
        fs.writeFileSync(catalogPath, newContent);
        
        console.log('Sección "Deportiva y Pijamería" actualizada exitosamente con ' + deportivaImages.length + ' productos.');
    } else {
        console.error('No se pudo encontrar la sección de Deportiva y Pijamería en el archivo.');
    }
}

// Ejecutar la actualización
updateDeportivaSection();
