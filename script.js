// const fetchButton = document.getElementById('fetch-products');
// const apiEndpoint = 'https://interveiw-mock-api.vercel.app/api/getProducts';
// const productContainer = document.getElementById('product-container');
// const spinner = document.getElementById('spinner');

// let products = [];

// const fetchProducts = async () => {
//     try {
//         // Show spinner and hide button
//         fetchButton.classList.add('hidden');
//         spinner.classList.remove('hidden');

//         const response = await fetch(apiEndpoint);
//         if (!response.ok) throw new Error('Failed to fetch products');

//         const data = await response.json();
//         console.log('API Response:', data); // Debugging

//         // Extract products from the response
//         products = data.data.map(item => item.product) || [];

//         if (!Array.isArray(products)) {
//             throw new Error('Unexpected data format');
//         }

//         renderProducts(products);
//     } catch (error) {
//         productContainer.innerHTML = `<p>Error loading products: ${error.message}</p>`;
//     } finally {
//         // Hide spinner after loading
//         spinner.classList.add('hidden');
//     }
// };

// const renderProducts = (productList) => {
//     productContainer.innerHTML = ''; // Clear any previous products
//     productList.forEach((product, index) => {
//         const {
//             title,
//             body_html,
//             variants,
//             image,
//         } = product;

//         const price = variants?.[0]?.price || 'N/A';
//         const imageUrl = image?.src || 'placeholder.jpg';

//         // Create product card
//         const productCard = document.createElement('div');
//         productCard.className = 'product-card';
//         productCard.style.animationDelay = `${index * 0.1}s`;

//         productCard.innerHTML = `
//             <img src="${imageUrl}" alt="${title || 'Product'}">
//             <div class="details">
//                 <h3>${title || 'Unnamed Product'}</h3>
//                 <p>${body_html || 'No description available.'}</p>
//                 <p class="price">Rs. ${price}</p>
//                 <button>Add to Cart</button>
//             </div>
//         `;

//         productContainer.appendChild(productCard);
//     });
// };

// fetchButton.addEventListener('click', fetchProducts);


const fetchButton = document.getElementById('fetch-products');
const apiEndpoint = 'https://interveiw-mock-api.vercel.app/api/getProducts';
const productContainer = document.getElementById('product-container');
const spinner = document.getElementById('spinner');
const sortDropdown = document.getElementById('sort');

let products = [];

const fetchProducts = async () => {
    try {
        fetchButton.classList.add('hidden');
        spinner.classList.remove('hidden');

        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();
        products = data.data || []; // Extract product array from API response

        renderProducts(products);
    } catch (error) {
        productContainer.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    } finally {
        spinner.classList.add('hidden');
    }
};

// const renderProducts = (productList) => {
//     productContainer.innerHTML = ''; // Clear any previous products
//     productList.forEach((item, index) => {
//         const product = item.product;
//         const productCard = document.createElement('div');
//         productCard.className = 'product-card';
//         productCard.style.animationDelay = `${index * 0.1}s`; // Staggered fade-in
//         productCard.innerHTML = `
//             <img src="${product.image?.src || 'https://via.placeholder.com/150'}" alt="${product.title}">
//             <div class="details">
//                 <h3>${product.title}</h3>
//                 <p><strong>Price:</strong> ₹${parseFloat(product.variants[0].price).toFixed(2)}</p>
//             </div>
//         `;
//         productContainer.appendChild(productCard);
//     });
// };
const renderProducts = (productList) => {
    productContainer.innerHTML = ''; // Clear any previous products
    productList.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`; // Staggered fade-in

        productCard.innerHTML = `
            <img src="${product.product.image.src}" alt="${product.product.title}">
            <div class="details">
                <h3>${product.product.title}</h3>
                <p>${product.product.vendor}</p>
                <p><strong>Price:</strong> Rs. ${parseFloat(product.product.variants[0].price).toFixed(2)}</p>
                <button class="add-to-cart-button">Add to Cart</button>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-button').forEach((button, index) => {
        button.addEventListener('click', () => addToCart(productList[index]));
    });
};

const addToCart = (product) => {
    alert(`${product.product.title} has been added to your cart!`);
};


const sortProducts = (order) => {
    let sortedProducts = [...products];

    if (order === 'low-to-high') {
        sortedProducts.sort((a, b) => parseFloat(a.product.variants[0].price) - parseFloat(b.product.variants[0].price));
    } else if (order === 'high-to-low') {
        sortedProducts.sort((a, b) => parseFloat(b.product.variants[0].price) - parseFloat(a.product.variants[0].price));
    }

    renderProducts(sortedProducts);
};

// Listen for dropdown changes
sortDropdown.addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === 'low-to-high') {
        sortProducts('low-to-high');
    } else if (selectedOption === 'high-to-low') {
        sortProducts('high-to-low');
    } else {
        renderProducts(products); // Default order
    }
});

fetchButton.addEventListener('click', fetchProducts);
