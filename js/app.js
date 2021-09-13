const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const id = product.id;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="col">
    <div class="card">
      <img src="${image}" class="card-img-top" alt="${product.title}" height="250">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p>Category: ${product.category}</p>
        <p>Rating: ${product.rating.count} | Average Rating: ${product.rating.rate}</p>
        <h2 class="fs-4">Price: $ ${product.price}</h2>
      </div>
      <div class="card-footer text-center">
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-info">add to cart</button>
      
      <button id="details-btn" class="btn btn-dark" onclick='loadSingleProduct(${id})' data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      </div>
    </div>
  </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};

// load single product
const loadSingleProduct = id => {
  const url = `https://fakestoreapi.com/products/${id}`;

  fetch(url)
    .then(res => res.json())
    .then(data => showSingleProduct(data));
}

// show single product in UI 

const showSingleProduct = data => {
  // Clear Previous Item
  document.getElementById('single-product-details').innerText = '';
  // Single Item Details
  const container = document.getElementById('single-product-details');
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
  <div class="card-header">
    ${data.title}
  </div>
  <div class="card-body">
  <img src="${data.image}" class="card-img-top" alt="${data.title}" height="250">
    <h5 class="card-text">Category: ${data.category}</h5>
    <p class="card-text">Price: $ ${data.price}</p>
    <p class="card-text">Total Rating: <strong>${data.rating.count}</strong> | Average Rating <strong>${data.rating.rate}</strong></p>
    <p class="card-text">${data.description}</p>
  </div>
  `;
  container.appendChild(card);
};


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted < 200) {
    setInnerText("delivery-charge", 20);
  }
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  //  update total cart price
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// Clear cart after Buy Now 
const orderProducts = () => {
  setInnerText('total-Products', 0);
  setInnerText('price', 0);
  setInnerText('delivery-charge', 0);
  setInnerText('total-tax', 0);
  setInnerText('total', 0);
}