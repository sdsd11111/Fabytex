document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const ITEMS_PER_PAGE = 6;
    
    // Get all product sections
    const productSections = document.querySelectorAll('.product-section');
    
    // Initialize pagination for each section
    productSections.forEach(section => {
        const grid = section.querySelector('.catalog-grid');
        if (!grid) return;
        
        const items = Array.from(grid.querySelectorAll('.product-card'));
        const totalItems = items.length;
        
        // Hide all items initially
        items.forEach((item, index) => {
            if (index >= ITEMS_PER_PAGE) {
                item.style.display = 'none';
            }
        });
        
        // Add "Load More" button if there are more items to show
        if (totalItems > ITEMS_PER_PAGE) {
            const loadMoreBtn = document.createElement('button');
            loadMoreBtn.className = 'load-more-btn';
            loadMoreBtn.textContent = 'Ver más productos';
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.style.margin = '2rem auto';
            loadMoreBtn.style.padding = '0.75rem 2rem';
            loadMoreBtn.style.backgroundColor = '#ffcc00';
            loadMoreBtn.style.color = '#001f3f';
            loadMoreBtn.style.border = 'none';
            loadMoreBtn.style.borderRadius = '4px';
            loadMoreBtn.style.cursor = 'pointer';
            loadMoreBtn.style.fontWeight = '600';
            loadMoreBtn.style.transition = 'all 0.3s ease';
            
            loadMoreBtn.addEventListener('mouseover', () => {
                loadMoreBtn.style.backgroundColor = '#e6b800';
                loadMoreBtn.style.transform = 'translateY(-2px)';
            });
            
            loadMoreBtn.addEventListener('mouseout', () => {
                loadMoreBtn.style.backgroundColor = '#ffcc00';
                loadMoreBtn.style.transform = 'translateY(0)';
            });
            
            let visibleItems = ITEMS_PER_PAGE;
            
            loadMoreBtn.addEventListener('click', () => {
                // Show next set of items
                const itemsToShow = Math.min(visibleItems + ITEMS_PER_PAGE, totalItems);
                
                for (let i = visibleItems; i < itemsToShow; i++) {
                    if (items[i]) {
                        items[i].style.display = 'block';
                        // Add fade-in animation
                        items[i].style.animation = 'fadeIn 0.5s ease-in-out';
                    }
                }
                
                visibleItems = itemsToShow;
                
                // Hide button if all items are shown
                if (visibleItems >= totalItems) {
                    loadMoreBtn.style.display = 'none';
                }
            });
            
            // Add button after the grid
            grid.parentNode.insertBefore(loadMoreBtn, grid.nextSibling);
        }
    });
});

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .product-card {
        opacity: 0;
        animation: fadeIn 0.5s ease-in-out forwards;
    }
`;
document.head.appendChild(style);
