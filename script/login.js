const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
// Seleciona o botão "Voltar" pelo seu seletor de classe
const backButton = document.querySelector('.back-button');

// Adiciona um ouvinte de evento para o clique no botão
backButton.addEventListener('click', () => {
    // Utiliza window.history.back() para voltar para a página anterior
    window.history.back();
});
