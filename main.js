// Dados simulados dos produtos
const products = [
    {
        id: 1,
        name: "Furadeira de Impacto 750W",
        price: 299.90,
        image: "assets/images/furadeira.jpg",
        rating: 4,
        category: "ferramentas-rotativas"
    },
    {
        id: 2,
        name: "Esmerilhadeira Angular 4.1/2\"",
        price: 189.90,
        image: "assets/images/esmerilhadeira.jpg",
        rating: 5,
        category: "ferramentas-rotativas"
    },
    {
        id: 3,
        name: "Chave de Impacto Pneumática",
        price: 450.00,
        image: "assets/images/chave-impacto.jpg",
        rating: 4,
        category: "ferramentas-rotativas"
    },
    {
        id: 4,
        name: "Cone BT40 ER32",
        price: 125.50,
        image: "assets/images/cone-bt40.jpg",
        rating: 5,
        category: "cones-bt"
    },
    {
        id: 5,
        name: "Paquímetro Digital 150mm",
        price: 89.90,
        image: "assets/images/paquimetro.jpg",
        rating: 4,
        category: "instrumentos-precisao"
    },
    {
        id: 6,
        name: "Micrômetro Externo 0-25mm",
        price: 156.00,
        image: "assets/images/micrometro.jpg",
        rating: 5,
        category: "instrumentos-precisao"
    },
    {
        id: 7,
        name: "Parafusadeira Elétrica 12V",
        price: 199.90,
        image: "assets/images/parafusadeira.jpg",
        rating: 4,
        category: "ferramentas-rotativas"
    },
    {
        id: 8,
        name: "Relógio Comparador 0,01mm",
        price: 78.50,
        image: "assets/images/relogio-comparador.jpg",
        rating: 4,
        category: "instrumentos-precisao"
    }
];

// Variáveis globais
let currentSlide = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let slideInterval;

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    startCarousel();
    
    // Adicionar evento de scroll para efeitos
    window.addEventListener('scroll', handleScroll);
});

// Função para carregar produtos na página
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Função para criar card de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBkbyBQcm9kdXRvPC90ZXh0Pjwvc3ZnPg=='">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span class="rating-text">(${product.rating}/5)</span>
            </div>
            <button class="btn-add-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
            </button>
        </div>
    `;
    
    return card;
}

// Funções do Carrossel
function startCarousel() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Remove classe active do slide atual
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    
    // Calcula próximo slide
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Adiciona classe active ao novo slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
    
    // Move o carrossel
    const slideContainer = document.getElementById('carouselSlides');
    slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Reinicia o timer automático
    clearInterval(slideInterval);
    startCarousel();
}

function currentSlide(n) {
    const direction = n - 1 - currentSlide;
    changeSlide(direction);
}

// Função de busca de produtos
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const productsGrid = document.getElementById('productsGrid');
    
    if (searchTerm === '') {
        loadProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #f1f1f1;">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente buscar com outros termos</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Funções do Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('Produto adicionado ao carrinho!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showNotification('Produto removido do carrinho!', 'info');
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        updateCart();
    }
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                <h3>Carrinho vazio</h3>
                <p>Adicione produtos para começar suas compras</p>
            </div>
        `;
        cartTotal.textContent = '0,00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWc8L3RleHQ+PC9zdmc+'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="cart-item-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                <input type="number" class="qty-input" value="${item.quantity}" 
                       onchange="updateQuantity(${item.id}, parseInt(this.value))" min="1">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2).replace('.', ',');
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    
    if (cartSidebar.classList.contains('open')) {
        updateCartDisplay();
    }
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Carrinho vazio! Adicione produtos antes de finalizar.', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const message = `Finalizando compra:\n${itemCount} item(s)\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`;
    
    if (confirm(message + '\n\nDeseja continuar?')) {
        // Simular processamento
        showNotification('Processando pedido...', 'info');
        
        setTimeout(() => {
            cart = [];
            updateCart();
            toggleCart();
            showNotification('Pedido realizado com sucesso! Obrigado pela preferência.', 'success');
        }, 2000);
    }
}

// Funções do Modal de Cadastro
function openRegisterModal() {
    const modal = document.getElementById('registerModal');
    const overlay = document.getElementById('overlay');
    
    modal.style.display = 'block';
    overlay.classList.add('active');
    
    // Foco no primeiro campo
    setTimeout(() => {
        document.getElementById('name').focus();
    }, 100);
}

function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    const overlay = document.getElementById('overlay');
    
    modal.style.display = 'none';
    overlay.classList.remove('active');
}

function submitRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        cep: formData.get('cep'),
        password: formData.get('password')
    };
    
    // Simular salvamento
    localStorage.setItem('userData', JSON.stringify(userData));
    
    showNotification('Cadastro realizado com sucesso!', 'success');
    closeRegisterModal();
    
    // Limpar formulário
    event.target.reset();
}

// Função para abrir categorias
function openCategory(category) {
    const categoryProducts = products.filter(product => product.category === category);
    
    if (categoryProducts.length === 0) {
        showNotification('Categoria em desenvolvimento. Em breve novos produtos!', 'info');
        return;
    }
    
    // Filtrar produtos por categoria
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    // Adicionar título da categoria
    const categoryTitle = document.createElement('div');
    categoryTitle.style.gridColumn = '1 / -1';
    categoryTitle.style.textAlign = 'center';
    categoryTitle.style.marginBottom = '20px';
    categoryTitle.innerHTML = `
        <h2 style="color: #fd6101; font-size: 28px; text-transform: uppercase; margin-bottom: 10px;">
            ${getCategoryName(category)}
        </h2>
        <button onclick="loadProducts()" style="background: #343e8a; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
            <i class="fas fa-arrow-left"></i> Voltar para todos os produtos
        </button>
    `;
    productsGrid.appendChild(categoryTitle);
    
    categoryProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    // Scroll para a seção de produtos
    document.querySelector('.featured-products').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function getCategoryName(category) {
    const names = {
        'ferramentas-rotativas': 'Ferramentas Rotativas',
        'cones-bt': 'Cones BT',
        'instrumentos-precisao': 'Instrumentos de Precisão'
    };
    return names[category] || category;
}

// Função para fechar modais
function closeModals() {
    closeRegisterModal();
    
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'warning' ? '#f39c12' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: 600;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Adicionar animações CSS para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Função para lidar com scroll
function handleScroll() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.carousel-section');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Efeito de fade-in para elementos
    const elements = document.querySelectorAll('.product-card, .category-trapezoid');
    elements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementVisible = 150;
        
        if (scrolled > elementTop - window.innerHeight + elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Adicionar estilos para animações de scroll
const scrollStyle = document.createElement('style');
scrollStyle.textContent = `
    .product-card, .category-trapezoid {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
`;
document.head.appendChild(scrollStyle);

// Função para formatar CEP
document.addEventListener('DOMContentLoaded', function() {
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 5) {
                value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            }
            e.target.value = value;
        });
    }
    
    // Formatar telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d)/, '($1) $2-$3');
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d)/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d)/, '($1) $2');
            }
            e.target.value = value;
        });
    }
});

// Função para busca em tempo real
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(searchProducts, 300);
        });
    }
});

// Prevenir zoom em dispositivos móveis
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

