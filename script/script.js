  
    document.getElementById("procurarcep").addEventListener("click", function () {
      window.location.href = "https://buscacepinter.correios.com.br/app/endereco/index.php";
    });
    
    document.addEventListener('DOMContentLoaded', () => {
    
      const cart = [];
      const favoritos = [];
      const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
      const cartModal = document.getElementById('cart-modal');
      const cartItemsContainer = document.getElementById('cart-items-container');
      const totalPriceElement = document.getElementById('total-price');
      const checkoutButton = document.getElementById('checkout-button');
      const closeButton = document.querySelector('.close-button');
      const cartIcon = document.getElementById('cart-icon');
      const favoritosContainer = document.getElementById('favoritos-container');
      const listaFavoritos = document.getElementById('lista-favoritos');
    
      function updateCartModal() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>R$ ${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <label for="quantity-${index}">Qtd:</label>
                    <input type="number" id="quantity-${index}" value="${item.quantity}" min="1">
                </div>
                <a class="remove-button" data-index="${index}">
                    <i class="fas fa-trash-alt trash-icon" aria-hidden="true"></i>
                </a>
            `;
            cartItemsContainer.appendChild(cartItem);
    
            const quantityInput = cartItem.querySelector(`#quantity-${index}`);
            quantityInput.addEventListener('change', (event) => {
                const newQuantity = event.target.value;
                cart[index].quantity = newQuantity;
                updateCartModal();
            });
    
            const removeButton = cartItem.querySelector('.remove-button');
            removeButton.addEventListener('click', () => {
                removeFromCart(index);
            });
        });
    
        totalPriceElement.textContent = `R$ ${calculateTotalPrice()}`;
    
        // Salva o carrinho no localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    
      function removeFromCart(index) {
          cart.splice(index, 1);
          updateCartModal();
      }
    
      function calculateTotalPrice() {
        const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }
    
    
      addToCartButtons.forEach(button => {
          button.addEventListener('click', (event) => {
              const product = event.target.closest('.produto');
              const image = product.querySelector('.main-image img').src;
              const name = product.querySelector('h2').textContent;
              const price = parseFloat(product.querySelector('.new-price').textContent.replace('R$', '').replace(',', '.'));
    
              const existingProduct = cart.find(item => item.name === name);
              if (existingProduct) {
                  existingProduct.quantity++;
              } else {
                  cart.push({
                      image,
                      name,
                      price,
                      quantity: 1
                  });
              }
    
              updateCartModal();
              cartModal.style.display = 'block';
          });
      });
    
      closeButton.addEventListener('click', () => {
          cartModal.style.display = 'none';
      });
    
      window.addEventListener('click', (event) => {
          if (event.target === cartModal) {
              cartModal.style.display = 'none';
          }
      });
    
      checkoutButton.addEventListener('click', () => {
          if (cart.length === 0) {
              alert('Seu carrinho está vazio. Adicione itens ao carrinho antes de finalizar a compra.');
          } else {
              window.location.href = 'finalizar-compra.html';
          }
      });
    
      // Adiciona evento de clique ao ícone do carrinho para abrir o carrinho
      cartIcon.addEventListener('click', () => {
          updateCartModal();
          cartModal.style.display = 'block';
      });
    
      // Adiciona evento de clique ao ícone de Favoritos para exibir a lista de favoritos
      const favoritosIcon = document.getElementById('favoritos-icon');
      favoritosIcon.addEventListener('click', () => {
          updateFavoritos();
          favoritosContainer.style.display = 'block';
      });
    
      // Função para adicionar ou remover favoritos
      function toggleFavorite(productName) {
          const index = favoritos.indexOf(productName);
          if (index === -1) {
              favoritos.push(productName);
          } else {
              favoritos.splice(index, 1);
          }
          updateFavoritos();
      }
    
      function updateFavoritos() {
          const listaFavoritosElement = listaFavoritos.querySelector('#lista-favoritos');
          listaFavoritosElement.innerHTML = '';
          favoritos.forEach((productName) => {
              const li = document.createElement('li');
              li.textContent = productName;
              listaFavoritosElement.appendChild(li);
          });
      }
    
      // Event listener para adicionar ou remover dos favoritos
      const favoritarButton = document.querySelector('.favoritar');
      favoritarButton.addEventListener('click', () => {
          const productName = document.querySelector('h2').textContent;
          toggleFavorite(productName);
          favoritarButton.classList.toggle('checked');
      });
    });
    
    
    function toggleFavorite() {
        const favoriteButton = document.querySelector('.favoritar');
        const starIcon = favoriteButton.querySelector('.fa-star');
      
        starIcon.classList.toggle('checked');
      }
      

      function proximoPasso(passo) {
          document.querySelectorAll('.step').forEach(function(passoElem, indice) {
              passoElem.classList.remove('active');
              if (indice + 1 < passo) {
                  passoElem.classList.add('completed');
              } else {
                  passoElem.classList.remove('completed');
              }
          });
          document.getElementById('passo' + passo).classList.add('active');
  
          document.querySelectorAll('.step-content').forEach(function(conteudoElem) {
              conteudoElem.classList.remove('active');
          });
          document.getElementById('conteudo-passo-' + passo).classList.add('active');
      }
  
      function passoAnterior(passo) {
          document.querySelectorAll('.step').forEach(function(passoElem, indice) {
              passoElem.classList.remove('active');
              if (indice + 1 < passo) {
                  passoElem.classList.add('completed');
              } else {
                  passoElem.classList.remove('completed');
              }
          });
          document.getElementById('passo' + passo).classList.add('active');
  
          document.querySelectorAll('.step-content').forEach(function(conteudoElem) {
              conteudoElem.classList.remove('active');
          });
          document.getElementById('conteudo-passo-' + passo).classList.add('active');
      }
  
    function confirmarCompra() {
        // Mostrar alerta
        alert('Compra Confirmada!');
        
        // Animação
        var animationContainer = document.getElementById('animationContainer');
        animationContainer.style.display = 'block';

    }


  
