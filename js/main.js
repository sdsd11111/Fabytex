document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Función para alternar el menú
    function toggleMenu() {
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Cerrar el menú al hacer clic en un enlace (solo en móviles)
        if (window.innerWidth <= 768) {
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    body.classList.remove('menu-open');
                });
            });
        }
    }

    // Evento para el botón del menú
    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar el menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Cerrar el menú al redimensionar la ventana si se supera el breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Efecto de scroll suave para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Solo prevenir el comportamiento predeterminado para enlaces internos que no sean #
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Funcionalidad del carrusel de productos
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const track = document.querySelector('.carousel-track');
        const prevButton = document.querySelector('.carousel-button.prev');
        const nextButton = document.querySelector('.carousel-button.next');
        const productCards = document.querySelectorAll('.product-card');
        
        // Ancho de cada tarjeta de producto (ancho + margen)
        const cardStyle = window.getComputedStyle(productCards[0]);
        const cardWidth = productCards[0].offsetWidth + 
                         parseFloat(cardStyle.marginRight) + 
                         parseFloat(cardStyle.marginLeft);
        
        // Índice de la tarjeta actualmente visible
        let currentIndex = 0;
        
        // Función para mover el carrusel a una posición específica
        function moveToSlide(index) {
            // Asegurarse de que el índice esté dentro de los límites
            if (index < 0) {
                index = 0;
            } else if (index >= productCards.length - 2) {
                // Mostrar 3 tarjetas a la vez en pantallas grandes
                index = productCards.length - 3;
            }
            
            currentIndex = index;
            const offset = -currentIndex * (cardWidth + 25); // 25px de gap
            track.style.transform = `translateX(${offset}px)`;
            
            // Actualizar estado de los botones
            updateButtonStates();
        }
        
        // Actualizar el estado de los botones de navegación
        function updateButtonStates() {
            if (prevButton && nextButton) {
                prevButton.disabled = currentIndex === 0;
                nextButton.disabled = currentIndex >= productCards.length - 3; // Mostrar 3 tarjetas a la vez
                
                // Cambiar opacidad para indicar estado deshabilitado
                prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
                nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
            }
        }
        
        // Event listeners para los botones de navegación
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                if (currentIndex > 0) {
                    moveToSlide(currentIndex - 1);
                }
            });
            
            nextButton.addEventListener('click', () => {
                if (currentIndex < productCards.length - 3) { // Mostrar 3 tarjetas a la vez
                    moveToSlide(currentIndex + 1);
                }
            });
            
            // Inicializar estado de los botones
            updateButtonStates();
        }
        
        // Manejar el evento de redimensionamiento de la ventana
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                moveToSlide(currentIndex);
            }, 250);
        });
        
        // Soporte para gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;
        
        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Mínimo de píxeles para considerar un deslizamiento
            
            // Deslizamiento hacia la izquierda (siguiente)
            if (touchStartX - touchEndX > swipeThreshold && currentIndex < productCards.length - 3) {
                moveToSlide(currentIndex + 1);
            } 
            // Deslizamiento hacia la derecha (anterior)
            else if (touchEndX - touchStartX > swipeThreshold && currentIndex > 0) {
                moveToSlide(currentIndex - 1);
            }
        }
    }
});
