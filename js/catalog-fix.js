document.addEventListener('DOMContentLoaded', function() {
    // Función para clonar todas las tarjetas a la sección "Todos"
    function cloneAllCards() {
        const allProductsGrid = document.getElementById('all-products-grid');
        if (!allProductsGrid) return;
        
        // Limpiar el contenedor primero
        allProductsGrid.innerHTML = '';
        
        // Obtener todas las tarjetas de producto de todas las secciones
        const allCards = document.querySelectorAll('.product-card');
        
        // Clonar cada tarjeta y agregarla al contenedor "Todos"
        allCards.forEach(card => {
            const clone = card.cloneNode(true);
            allProductsGrid.appendChild(clone);
        });
        
        console.log(`Se han clonado ${allCards.length} tarjetas a la sección "Todos"`);
    }
    
    // Función para inicializar las pestañas
    function initTabs() {
        // Mostrar todas las tarjetas en la pestaña "Todos" al cargar la página
        cloneAllCards();
        
        // Configurar el botón "Todos" para que muestre todas las tarjetas
        const allTabButton = document.querySelector('.tab-button[data-tab="all"]');
        if (allTabButton) {
            allTabButton.addEventListener('click', function() {
                cloneAllCards();
            });
        }
    }
    
    // Inicializar las pestañas
    initTabs();
});
