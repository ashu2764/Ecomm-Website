const fetchButton = document.getElementById('fetch-products');
const apiEndpoint = 'https://interveiw-mock-api.vercel.app/api/getProducts';
const productContainer = document.getElementById('product-container');
const spinner = document.getElementById('spinner');

let products = [];

const fetchProducts = async () => {
    try {
        // Show spinner and hide button
        fetchButton.classList.add('hidden');
        spinner.classList.remove('hidden');

        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error('Failed to fetch products');

        products = await response.json();
        renderProducts(products);
    } catch (error) {
        productContainer.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    } finally {
        // Hide spinner after loading
        spinner.classList.add('hidden');
    }
};

const renderProducts = (productList) => {
    productContainer.innerHTML = ''; // Clear any previous products
    productList.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`; // Staggered fade-in
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            </div>
        `;
        productContainer.appendChild(productCard);
    });
};

fetchButton.addEventListener('click', fetchProducts);
