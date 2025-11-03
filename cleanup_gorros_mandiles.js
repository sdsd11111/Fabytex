// List of cards to remove from Gorros y Mandiles section
const cardsToRemove = [
    'Chaleco',
    'Detalles',
    'Distintos Trabajos',
    'Estilista',
    'Municipio',
    'Otros Trabajos',
    'Peluquera',
    'Todo Tapado Azul',
    'Todo Tapado Rojo',
    'Trabajo Manuales',
    'Uniforme Escolar',
    'Veterinaria',
    'Trajes Medicos y de Enfermeria loja',
    'Manga Corta',
    'Odontologo',
    'Para Hombres',
    'Para Mujeres Blanco',
    'Para Mujeres Cafe',
    'Para Mujeres Odontologia',
    'Para Mujeres'
];

// Function to load HTML file
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'catalogo.html');

// Read the HTML file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Create a temporary DOM parser
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Get the Gorros y Mandiles grid
    const gorrosMandilesGrid = document.getElementById('gorros-mandiles-grid');
    
    if (!gorrosMandilesGrid) {
        console.error('Gorros y Mandiles grid not found!');
        return;
    }

    // Get all product cards in the section
    const productCards = gorrosMandilesGrid.querySelectorAll('.product-card');
    let removedCount = 0;
    let duplicatesRemoved = 0;
    const foundTitles = new Set();

    // Process each card
    productCards.forEach(card => {
        const titleElement = card.querySelector('.product-title');
        if (titleElement) {
            const title = titleElement.textContent.trim();
            
            // Check if the card should be removed
            if (cardsToRemove.includes(title) || foundTitles.has(title)) {
                if (foundTitles.has(title)) {
                    console.log(`Removing duplicate: ${title}`);
                    duplicatesRemoved++;
                } else {
                    console.log(`Removing incorrect card: ${title}`);
                    removedCount++;
                }
                card.remove();
            } else {
                foundTitles.add(title);
            }
        }
    });

    // Save the modified HTML
    const updatedHtml = dom.serialize();
    
    fs.writeFile(filePath, updatedHtml, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }
        console.log('Successfully updated the catalog file!');
        console.log(`Removed ${removedCount} incorrect cards and ${duplicatesRemoved} duplicate cards.`);
        console.log(`Total cards in Gorros y Mandiles section: ${foundTitles.size}`);
    });
});
