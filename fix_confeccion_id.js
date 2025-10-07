const fs = require('fs');
const path = require('path');

function fixConfeccionSection() {
    const catalogPath = path.join(__dirname, 'catalogo.html');
    let catalogContent = fs.readFileSync(catalogPath, 'utf8');
    
    // Cambiar el id de la sección para que coincida con el data-tab
    const newContent = catalogContent.replace(
        '<section id="confeccion-section" class="product-section">',
        '<section id="medida-section" class="product-section">'
    );
    
    // Hacer una copia de seguridad
    fs.writeFileSync(catalogPath + '.backup7', catalogContent);
    
    // Escribir el nuevo contenido
    fs.writeFileSync(catalogPath, newContent);
    
    console.log('Sección de Confección a Medida actualizada correctamente.');
}

fixConfeccionSection();
