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

// Get the Gorros y Mandiles grid
const gorrosMandilesGrid = document.getElementById('gorros-mandiles-grid');

if (gorrosMandilesGrid) {
    // Get all product cards in the section
    const productCards = gorrosMandilesGrid.querySelectorAll('.product-card');
    
    // Track how many cards were removed
    let removedCount = 0;
    
    // Check each card
    productCards.forEach(card => {
        const titleElement = card.querySelector('.product-title');
        if (titleElement) {
            const title = titleElement.textContent.trim();
            
            // Check if the card should be removed
            if (cardsToRemove.includes(title)) {
                card.remove();
                removedCount++;
                console.log(`Removed: ${title}`);
            }
        }
    });
    
    console.log(`Total cards removed: ${removedCount}`);
    
    // After removing incorrect cards, check for duplicates
    const remainingCards = gorrosMandilesGrid.querySelectorAll('.product-card');
    const uniqueTitles = new Set();
    const duplicateTitles = [];
    
    remainingCards.forEach(card => {
        const title = card.querySelector('.product-title')?.textContent.trim();
        if (title) {
            if (uniqueTitles.has(title)) {
                duplicateTitles.push(title);
                card.remove();
            } else {
                uniqueTitles.add(title);
            }
        }
    });
    
    if (duplicateTitles.length > 0) {
        console.log(`Removed ${duplicateTitles.length} duplicate cards:`, duplicateTitles);
    } else {
        console.log('No duplicate cards found.');
    }
    
    console.log(`Final card count: ${gorrosMandilesGrid.querySelectorAll('.product-card').length}`);
    
} else {
    console.error('Gorros y Mandiles grid not found!');
}
