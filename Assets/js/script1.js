const productContainer = document.getElementById('productContainer');
let allProducts = [];
let products = fetch('./Assets/js/sample1.json')
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);})
    .catch(error => console.error('Error fetching data:', error));
 
 
function createProductCard(product) {
    // 1. Create a fresh div for the card
    const card = document.createElement('div');
    
    // 2. Apply the Tailwind classes from your design
    card.className = "bg-white p-6 rounded-lg shadow-sm relative group";

    // 3. Set the full HTML structure inside
    card.innerHTML = `
       <button class="absolute top-4 right-4 text-red-500 text-xl hover:scale-125 transition"><i class="fas fa-heart"></i></button>
                    <div class="flex justify-center mb-4"><img src="${product.img}" class="h-40 object-contain group-hover:scale-110 transition-transform"></div>
                <div class="space-y-2">
                    <p class="text-[#4ca550] font-bold text-xl">${product.price}</p>
                    <h3 class="text-[#4ca550] font-bold text-lg">${product.name}</h3>
                    <p class="text-[#4ca550] font-bold mb-6">${product.category}</p>
                    <a href="./buynow.html?id=${product.id}"" class="mt-6 w-full bg-[#ff7f50] hover:bg-[#e66a3e] text-white font-semibold py-2 px-15 rounded-lg transition " onclick="addToCart(${product.id})">Buy Now</a>
                </div>
    `;

    
    productContainer.appendChild(card);
}
 
function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => createProductCard(product));
}

function filterProducts(category) {
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        let filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }

   
}
 



 // 1. Get the ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // 2. Fetch your JSON data
  fetch('./Assets/js/sample1.json')
    .then(response => response.json())
    .then(data => {
        // 3. Find the product that matches the ID
        const product = data.find(p => p.id == productId);
        
        if (product) {
            // 4. Update the HTML elements dynamically
            document.getElementById('productImage').src = product.img;
            document.getElementById('productName').innerText = product.name;
            document.getElementById('productCategory').innerText = product.category;
            document.getElementById('productPrice').innerText = product.price;
        }
    })
    .catch(error => console.error('Error loading product:', error));


    // Add this function to your script
function addToCart() {
    // 1. Get the current product data (assuming 'product' is globally available from your fetch)
    const productToAdd = {
        id: productId, // from your URL params
        name: document.getElementById('productName').innerText,
        price: document.getElementById('productPrice').innerText,
        img: document.getElementById('productImage').src,
        quantity: 1
    };

    // 2. Get existing cart from LocalStorage
    let cart = JSON.parse(localStorage.getItem('userCart')) || [];

    // 3. Check if it's already there
    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push(productToAdd);
    }

    // 4. Save and Redirect
    localStorage.setItem('userCart', JSON.stringify(cart));
    window.location.href = "cart.html"; // Go to the cart page
}


 function displayCart() {
    const cart = JSON.parse(localStorage.getItem('userCart')) || [];
    const container = document.getElementById('cart-list');
    const totalDisplay = document.getElementById('total-price');

    if (cart.length === 0) {
      container.innerHTML = '<p class="text-green-700 text-xl">Your card is empty.</p>';
      totalDisplay.innerText = "$0.00";
      return;
    }

    let totalAmount = 0;

    // Render the rows and calculate total
    container.innerHTML = cart.map(item => {
      // Logic to calculate total: Remove "$" and convert to a number
      const priceValue = parseFloat(item.price.replace('$', ''));
      totalAmount += priceValue * item.quantity;

      return `
        <div class="flex items-center justify-between">
          <div class="w-1/4">
            <img src="${item.img}" class="w-48 h-auto object-contain">
          </div>
          <div class="w-1/4">
            <h3 class="text-green-700 font-bold text-2xl">${item.name}</h3>
            <p class="text-gray-500 text-lg">${item.price}</p>
          </div>
          <div class="w-1/4 text-center">
            <span class="text-gray-400 text-xl">Qty:${item.quantity}</span>
          </div>
          <div class="w-1/4 text-right">
            <button onclick="removeItem('${item.id}')" class="text-gray-400 hover:text-red-500">
              <i class="fas fa-trash-alt text-xl"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Update the Total Amount display
    totalDisplay.innerText = `$${totalAmount.toFixed(2)}`;
  }

  function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('userCart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('userCart', JSON.stringify(cart));
    displayCart();
  }

  // Run on page load
  displayCart();