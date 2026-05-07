//Append product

const productContainer = document.getElementById('productContainer');
let allProducts = [];
let products = fetch('./Assets/js/sample.json')
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);})
    .catch(error => console.error('Error fetching data:', error));
 
 
function createProductCard(product) {
    // 1. Create a fresh div for the card
    const card = document.createElement('div');
    
    // 2. Apply the Tailwind classes from your design
    card.className = "group relative bg-white p-8 border-2 border-gray-500 hover:border-[#ff7f50]  transition-all duration-300  cursor-pointer overflow-hidden";

    // 3. Set the full HTML structure inside
    card.innerHTML = `
       <div class="absolute inset-6  border border-gray-500 rounded-md group-hover:border-transparent transition-colors duration-300"></div>
      
      <div class="flex flex-col items-center text-center relative z-10">
   
        <img src="${product.img}" alt="Fresh" class="w-48 h-48 object-contain transition-transform duration-500 group-hover:scale-110">
        <h3 class="text-xl font-bold text-[#2d5a27] mb-4">${product.name}</h3>
          <p class="text-gray-500 text-lg mb-2">${product.price}</p>
        <div class="flex space-x-1 text-yellow-400 mb-6">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
        </div>
        <button class="px-8 py-2 border-2 border-black text-black font-semibold rounded-md hover:bg-[#ff7f50] hover:border-[#ff7f50] hover:text-white transition-all duration-300">
         Add to card
        </button>
      </div>
    `;

    // 4. Append the new card to your container
    // (Assumes you have: const productContainer = document.querySelector('.your-grid-class'))
    productContainer.appendChild(card);
}
 
function displayProducts(products) {
    productContainer.innerHTML = '';
    products.forEach(product => createProductCard(product));
}





//Contact page (form submission)
 document.getElementById('contactForm').addEventListener('submit', function(event) {
    // 1. Prevent the page from reloading
    event.preventDefault();

    // 2. Get the user's name (optional)
    const name = this.querySelector('input[type="text"]').value;

    // 3. Show a simple alert message
    // You can replace this with a beautiful modal or a toast later
    alert(`Thank you, ${name}! Your message has been sent successfully.`);

    // 4. Clear the form fields
    this.reset();
  });

