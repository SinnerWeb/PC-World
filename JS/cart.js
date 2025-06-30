const cartItems = [];
const cartContainer = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");
const cartToggle = document.getElementById("cart-toggle");
const cartSection = document.getElementById("cart");
const closeCartButton = document.getElementById("close-cart");
const orderModal = document.getElementById("order-modal");
const successModal = document.getElementById("success-modal");
const closeOrderModalButton = document.getElementById("close-order-modal");
const closeSuccessModalButton = document.getElementById("close-success-modal");
const orderForm = document.getElementById("order-form");
const checkoutButton = document.getElementById("checkout-button");

function updateCart() {
  cartContainer.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    totalPrice += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.specs}</p>
        <p>Ціна: ${item.price} ₴</p>
        <p>Кількість: ${item.quantity}</p>
      </div>
      <div class="cart-item-controls">
        <button class="increase" data-index="${index}">+</button>
        <button class="decrease" data-index="${index}">-</button>
        <button class="remove" data-index="${index}">Видалити</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  console.log("Содержимое корзины:", cartItems);
  console.log("Итоговая сумма:", totalPrice);

  totalPriceElement.textContent = totalPrice;

  if (cartItems.length > 0) {
    cartToggle.style.display = "block";
  } else {
    cartToggle.style.display = "none";
  }

  document.querySelectorAll(".increase").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cartItems[index].quantity++;
      updateCart();
    });
  });

  document.querySelectorAll(".decrease").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
      } else {
        cartItems.splice(index, 1);
      }
      updateCart();
    });
  });

  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cartItems.splice(index, 1);
      updateCart();
    });
  });
}

cartToggle.addEventListener("click", () => {
  cartSection.classList.add("visible");
  cartToggle.style.display = "none";
});

closeCartButton.addEventListener("click", () => {
  cartSection.classList.remove("visible");
  if (cartItems.length > 0) {
    cartToggle.style.display = "block";
  }
});

document.querySelectorAll(".product").forEach((product) => {
  const button = product.querySelector("button");
  button.addEventListener("click", () => {
    const name = product.querySelector("h3").textContent;
    const priceText = product
      .querySelector("strong")
      .nextSibling.nodeValue.trim();
    const price = Number(priceText.replace(/[^\d]/g, ""));
    const image = product.querySelector("img").src;
    const specs = product.dataset.specs;

    console.log("Название:", name);
    console.log("Исходный текст цены:", priceText);
    console.log("Цена после обработки:", price);

    const existingItem = cartItems.find((item) => item.name === name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({
        name,
        price,
        image,
        specs,
        quantity: 1,
      });
    }

    updateCart();
  });
});

checkoutButton.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Корзина порожня. Додайте товари перед оформленням замовлення.");
    return;
  }
  orderModal.classList.add("visible");
});

closeOrderModalButton.addEventListener("click", () => {
  orderModal.classList.remove("visible");
});

closeSuccessModalButton.addEventListener("click", () => {
  successModal.classList.remove("visible");
});

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!fullname || !phone || !address || !email) {
    alert("Будь ласка, заповніть усі поля.");
    return;
  }

  orderModal.classList.remove("visible");
  successModal.classList.add("visible");

  cartItems.length = 0;
  updateCart();

  cartSection.classList.remove("visible");
});
