// menu.js

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function renderMenuItems(category, containerId, addToCart) {
  const container = document.getElementById(containerId);
  container.innerHTML = `<h3>${category}</h3>` +
    menuData[category].map(item => `
      <div class="item-card">
        <h4>${item.name}</h4>
        <p>${formatCurrency(item.price)}</p>
        <button onclick="addToCartHandler('${item.id}', '${item.name}', ${item.price})">
          Adicionar
        </button>
      </div>
    `).join("");
}

// Simulando uma função de adicionar ao carrinho
function addToCartHandler(id, name, price) {
  console.log("Adicionado:", { id, name, price });
  // Aqui você pode usar: addToCart({ id, name, price });
}

document.addEventListener("DOMContentLoaded", () => {
  // Inicializa abas
  const triggers = document.querySelectorAll(".tab-trigger");
  const contents = document.querySelectorAll(".tabs-content");

  triggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const selected = btn.dataset.tab;

      // Alterna botão ativo
      triggers.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Alterna conteúdo visível
      contents.forEach(content => {
        if (content.id === `tab-${selected}`) {
          content.classList.remove("hidden");
        } else {
          content.classList.add("hidden");
        }
      });
    });
  });

  // Renderiza os três conteúdos
  renderMenuItems("hamburgers", "tab-hamburgers", addToCartHandler);
  renderMenuItems("snacks", "tab-snacks", addToCartHandler);
  renderMenuItems("drinks", "tab-drinks", addToCartHandler);
});
