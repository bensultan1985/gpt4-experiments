document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartLink = document.querySelector(".cart-link");
  const cartCount = document.getElementById("cart-count");
  const cartModal = document.querySelector(".cart-modal");
  const cartItems = document.getElementById("cart-items");
  const closeCartButton = document.querySelector("#close-cart"); // Update this line
  const checkoutButton = document.getElementById("checkout");
  const cart = {};

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  cartLink.addEventListener("click", showCart);
  closeCartButton.addEventListener("click", hideCart);
  checkoutButton.addEventListener("click", () => {
    alert("Checkout functionality not implemented");
  });

  function addToCart(e) {
    const product = e.target.dataset.product;
    const price = parseFloat(e.target.dataset.price);

    if (cart[product]) {
      cart[product].count += 1;
    } else {
      cart[product] = {
        price,
        count: 1,
      };
    }

    updateCartCount();
  }

  function updateCartCount() {
    let totalCount = 0;
    for (const item in cart) {
      totalCount += cart[item].count;
    }
    cartCount.textContent = totalCount;
  }

  function showCart() {
    cartItems.innerHTML = "";

    for (const item in cart) {
      const li = document.createElement("li");
      li.textContent = `${item} - ${cart[item].count} x $${cart[
        item
      ].price.toFixed(2)} = $${(cart[item].count * cart[item].price).toFixed(
        2
      )}`;
      cartItems.appendChild(li);
    }

    cartModal.classList.remove("hidden");
  }

  function hideCart() {
    cartModal.classList.add("hidden");
  }
});
