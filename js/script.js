// script.js

let step = "menu"; // "menu" | "checkout" | "confirmation"
let cart = [];

function addToCart(item) {
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  render();
}

function updateQuantity(id, quantity) {
  if (quantity <= 0) {
    cart = cart.filter(item => item.id !== id);
  } else {
    cart = cart.map(item => (item.id === id ? { ...item, quantity } : item));
  }
  render();
}

function clearCart() {
  cart = [];
  render();
}

function getTotalAmount() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function proceedToCheckout() {
  step = "checkout";
  render();
}

function goBackToMenu() {
  step = "menu";
  render();
}

function confirmOrder() {
  step = "confirmation";
  render();
}

function startNewOrder() {
  clearCart();
  step = "menu";
  render();
}

function render() {
  const menu = document.getElementById("menu");
  const checkout = document.getElementById("checkout");
  const confirmation = document.getElementById("confirmation");
  const cartList = document.getElementById("cart-list");
  const totalAmount = document.getElementById("total-amount");

  menu.style.display = step === "menu" ? "block" : "none";
  checkout.style.display = step === "checkout" ? "block" : "none";
  confirmation.style.display = step === "confirmation" ? "block" : "none";

  // Atualiza carrinho
  if (cartList && totalAmount) {
    cartList.innerHTML = cart.map(item => `
      <li>
        ${item.name} - R$ ${item.price.toFixed(2)} x 
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.id}', this.value)">
      </li>
    `).join("");

    totalAmount.textContent = `Total: R$ ${getTotalAmount().toFixed(2)}`;
  }
}

// Inicializa ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  render();
});
