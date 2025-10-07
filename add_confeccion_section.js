const fs = require('fs');
const path = require('path');

function addConfeccionSection() {
    const catalogPath = path.join(__dirname, 'catalogo.html');
    let catalogContent = fs.readFileSync(catalogPath, 'utf8');
    
    // Crear la sección de Confección a Medida siguiendo el mismo patrón que la sección de Deportiva
    const confeccionSection = `
        <!-- Sección de Confección a Medida -->
        <section id="medida-section" class="product-section">
            <div class="container">
                <h2 class="section-title">Confección a Medida</h2>
                <p class="section-subtitle">Productos personalizados según tus necesidades</p>
                <div class="catalog-grid">
                    <!-- Las tarjetas se agregarán aquí dinámicamente -->
                </div>
            </div>
        </section>`;
    
    // Encontrar la posición donde insertar la nueva sección (después de la sección de Deportiva)
    const insertAfter = catalogContent.indexOf('</section>', catalogContent.indexOf('id="deportiva-section"')) + 10;
    
    // Insertar la nueva sección
    const newContent = catalogContent.substring(0, insertAfter) + 
                     confeccionSection + 
                     catalogContent.substring(insertAfter);
    
    // Hacer una copia de seguridad
    fs.writeFileSync(catalogPath + '.backup8', catalogContent);
    
    // Escribir el nuevo contenido
    fs.writeFileSync(catalogPath, newContent);
    
    console.log('Sección de Confección a Medida agregada correctamente.');
}

addConfeccionSection();
