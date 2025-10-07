const fs = require('fs');
const path = require('path');

function removeYogaCard() {
    const catalogPath = path.join(__dirname, 'catalogo.html');
    let catalogContent = fs.readFileSync(catalogPath, 'utf8');
    
    // Buscar la tarjeta específica por su título
    const cardStart = catalogContent.indexOf('Outfits de Yoga y Gimnasio loja');
    if (cardStart === -1) {
        console.log('No se encontró la tarjeta de Yoga para eliminar.');
        return;
    }
    
    // Encontrar el inicio de la tarjeta (el div.product-card más cercano hacia atrás)
    const cardDivStart = catalogContent.lastIndexOf('<div class="product-card"', cardStart);
    
    // Encontrar el final de la tarjeta (el cierre del div.product-card correspondiente)
    let openDivs = 1;
    let currentPos = cardDivStart + 1;
    
    while (openDivs > 0 && currentPos < catalogContent.length) {
        const nextDivOpen = catalogContent.indexOf('<div', currentPos);
        const nextDivClose = catalogContent.indexOf('</div>', currentPos);
        
        if (nextDivOpen !== -1 && nextDivOpen < nextDivClose) {
            openDivs++;
            currentPos = nextDivOpen + 4;
        } else if (nextDivClose !== -1) {
            openDivs--;
            currentPos = nextDivClose + 6;
        } else {
            break;
        }
    }
    
    if (openDivs === 0) {
        // Hacer una copia de seguridad
        fs.writeFileSync(catalogPath + '.backup10', catalogContent);
        
        // Eliminar la tarjeta
        const newContent = catalogContent.substring(0, cardDivStart) + 
                         catalogContent.substring(currentPos);
        
        // Escribir el nuevo contenido
        fs.writeFileSync(catalogPath, newContent);
        console.log('Tarjeta de Yoga eliminada correctamente.');
    } else {
        console.log('No se pudo encontrar el cierre de la tarjeta.');
    }
}

removeYogaCard();
