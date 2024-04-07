const products = [
    { name: "Adidas Shoes", price: 300, id: 1, quantity: 1,},
    { name: "Nike Shoes", price: 350, id: 2, quantity: 1,},
    { name: "Puma Shoes", price: 220, id: 3, quantity: 1, },
    { name: "Reebok Shoes", price: 190, id: 4, quantity: 1, },
    { name: "New Balance Shoes", price: 205, id: 5, quantity: 1, },
    { name: "Asics Shoes", price: 100, id: 6, quantity: 1,},
  ];
  
 
let cart = []

const productsHTML = products.map(
  (product) => `<div class="product-card">
        <h2 class="product-name">${product.name}</h2>
        <strong>$${product.price}</strong>
        <button class="product-btn" id=${product.id}>Add to Cart</button>
        <button class="like-btn" id="like-${product.id}">❤️</button>
    </div>`
);

const result = document.querySelector(".result");
result.innerHTML = productsHTML.join("");

function updateCart() {
  const cartHTML = cart.map(
    (item) => `<div class="cart-item">
            <h3>${item.name}</h3>
            <div class="cart-detail"><div class="mid">
                <button onclick={decrItem(${item.id})}>-</button>
                <p>${item.quantity}</p>
                <button onclick={incrItem(${item.id})}>+</button>
            </div>
            <p>$${item.price}</p>
            <button onclick={deleteItem(${item.id})} class="cart-product" id=${item.id}>D</button></div>
           </div>`
  );

  const cartItems = document.querySelector(".cart-items");
  cartItems.innerHTML = cartHTML.join("");
}

let num = document.querySelectorAll(".product-btn").length;
for (let i = 0; i < num; i++) {
  document
    .querySelectorAll(".product-btn")
  [i].addEventListener("click", function (e) {
    addToCart(products, parseInt(e.target.id));
  });
}

function addToCart(products, id){
  const product = products.find((product) => product.id === id);
  const cartProduct = cart.find((product) => product.id === id);
  if (cartProduct != undefined && product.id == cartProduct.id) {
    incrItem(id);
  } else {
    cart.unshift(product);
  }
  updateCart();
  getTotal(cart);
};

function getTotal(cart) {
  let { totalItem, cartTotal } = cart.reduce(
    (total, cartItem) => {
      total.cartTotal += cartItem.price * cartItem.quantity;
      total.totalItem += cartItem.quantity;
      return total;
    },
    { totalItem: 0, cartTotal: 0 }
  );
  const totalItemsHTML = document.querySelector(".noOfItems");
  totalItemsHTML.innerHTML = `${totalItem} items`;
  const totalAmountHTML = document.querySelector(".total");
  totalAmountHTML.innerHTML = `$${cartTotal}`;
}

function incrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i] && cart[i].id == id) {
      cart[i].quantity += 1;
    }
  }
  updateCart();
  getTotal(cart);
}

function decrItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id && cart[i].quantity > 1) {
      cart[i].quantity -= 1;
    }
  }
  updateCart();
  getTotal(cart);
}

function deleteItem(id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === id) {
      cart[i].quantity = 1;
      cart.splice(i, 1);
    }
  }
  updateCart();
  getTotal(cart);
}


for (let i = 0; i < num; i++) {
  document
    .querySelectorAll(".product-btn")
    [i].addEventListener("click", function (e) {
      addToCart(products, parseInt(e.target.id));
    });

  document
    .querySelectorAll(".like-btn")
    [i].addEventListener("click", function (e) {
      const likeButton = e.target;
      const productId = parseInt(likeButton.id.split("-")[1]);
      toggleLike(likeButton);
      likeProduct(productId);
    });
}

// Function to toggle like button style
function toggleLike(likeButton) {
  likeButton.classList.toggle("liked");
}

// Function to handle liking a product
function likeProduct(productId) {
  // Find the product in the products array
  const product = products.find((product) => product.id === productId);
  // Perform any like-related actions here
  console.log(`Liked ${product.name}`);
}
