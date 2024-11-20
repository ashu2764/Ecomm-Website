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

        const data = await response.json();
        console.log('API Response:', data); // Debugging

        // Extract products from the response
        products = data.data.map(item => item.product) || [];

        if (!Array.isArray(products)) {
            throw new Error('Unexpected data format');
        }

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
        const {
            title,
            body_html,
            variants,
            image,
        } = product;

        const price = variants?.[0]?.price || 'N/A';
        const imageUrl = image?.src || 'placeholder.jpg';

        // Create product card
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;

        productCard.innerHTML = `
            <img src="${imageUrl}" alt="${title || 'Product'}">
            <div class="details">
                <h3>${title || 'Unnamed Product'}</h3>
                <p>${body_html || 'No description available.'}</p>
                <p class="price">Rs. ${price}</p>
                <button>Add to Cart</button>
            </div>
        `;

        productContainer.appendChild(productCard);
    });
};

fetchButton.addEventListener('click', fetchProducts);
