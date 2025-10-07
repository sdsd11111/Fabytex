// Función para formatear el título a partir del nombre del archivo
function formatTitle(filename) {
    // Eliminar la extensión del archivo
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    // Separar por guiones y capitalizar cada palabra
    const words = nameWithoutExt.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
    // Unir con espacios
    return words.join(' ');
}

// Función para generar el HTML de una tarjeta de producto
function generateProductCard(imagePath, category) {
    const filename = imagePath.split('\\').pop();
    const title = formatTitle(filename.replace(category + '-', ''));
    
    return `
    <div class="product-card" data-category="${category}">
        <div class="product-header">
            <div class="product-badge">Nuevo</div>
            <div class="product-image">
                <img src="${imagePath.replace(/\\/g, '/')}" alt="${title}" loading="lazy">
                <div class="quick-view">
                    <i class="fas fa-eye"></i> Vista Rápida
                </div>
            </div>
        </div>
        <div class="product-details">
            <h3>${title}</h3>
            <div class="product-actions">
                <a href="#" class="btn btn-outline">Ver Detalles</a>
                <button class="btn-icon" title="Añadir a favoritos">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    </div>`;
}

// Categorías y sus imágenes
const categories = {
    'moda-femenina': [
        'moda-femenina-chaleco-de-mujer.jpeg',
        'moda-femenina-chaleco.jpeg',
        'moda-femenina-detalles.jpeg'
    ],
    'uniformes-y-trabajo': [
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
    ],
    'indumentaria-medica': [
        'indumentaria-medica-manga-corta.jpeg',
        'indumentaria-medica-odontologo.jpeg',
        'indumentaria-medica-para-hombres.jpeg',
        'indumentaria-medica-para-mujeres-blanco.jpeg',
        'indumentaria-medica-para-mujeres-cafe.jpeg',
        'indumentaria-medica-para-mujeres-odontologia.jpeg',
        'indumentaria-medica-para-mujeres.jpeg'
    ],
    'deportiva-y-pijameria': [
        'deportiva-y-pijameria-chaleco-deportivo.jpeg',
        'deportiva-y-pijameria-para-hombres-camisetas.jpeg',
        'deportiva-y-pijameria-para-hombres.jpeg',
        'deportiva-y-pijameria.jpg'
    ],
    'confeccion-a-medida': [
        'confeccion-a-medida-allikay.jpeg',
        'confeccion-a-medida-camisa-hombre.jpeg',
        'confeccion-a-medida-camiseta-doozzin.jpeg',
        'confeccion-a-medida-camiseta-eventos.jpeg',
        'confeccion-a-medida-camiseta.jpeg',
        'confeccion-a-medida-pastoral-caritas.jpeg',
        'confeccion-a-medida-restaurante.jpeg',
        'confeccion-a-medida-super-mercado-zaka.jpeg'
    ]
};

// Generar el HTML para cada categoría
let htmlOutput = '';

Object.entries(categories).forEach(([category, images]) => {
    htmlOutput += `\n<!-- Sección de ${formatTitle(category)} -->`;
    htmlOutput += `\n<section id="${category}-section" class="product-section">`;
    htmlOutput += `\n    <div class="container">`;
    htmlOutput += `\n        <h2 class="section-title">${formatTitle(category)}</h2>`;
    htmlOutput += `\n        <div class="catalog-grid" id="${category}-grid">`;
    
    // Agregar las tarjetas de productos
    images.forEach(image => {
        const imagePath = `images/catalogo/${category}-${image}`;
        htmlOutput += generateProductCard(imagePath, category);
    });
    
    htmlOutput += '\n        </div>'; // cierra .catalog-grid
    htmlOutput += '\n    </div>'; // cierra .container
    htmlOutput += '\n</section>\n';
});

console.log(htmlOutput);
