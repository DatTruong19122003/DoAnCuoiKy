import { products } from "./Product.js";

const productContainer = document.getElementById("product-container");
const urlParams = new URLSearchParams(window.location.search);
const keySearch = urlParams.get("search");
var listProduct;
if (keySearch == null) {
   listProduct = products;
}
else {
   listProduct = []
   for (let i = 0; i < products.length; i++) {
      if (keySearch && products[i].name.toLowerCase().includes(keySearch.toLowerCase())) {
         listProduct.push(products[i])
      }
   }
   var titleSearchResult = document.querySelector(".title");
   titleSearchResult.textContent = `Search result: ${keySearch}`;
}
const productCount = document.querySelector(".product-count");
productCount.textContent = `${listProduct.length} products`;

// listProduct.forEach((product) => {
//    // Tạo một thẻ sản phẩm mới từ mẫu thẻ sản phẩm
//    const productCard = document.createElement("div");
//    productCard.classList.add("product-card");
//    productCard.setAttribute('onclick', 'ProductInfo(event)');

//    const productContent = document.createElement("div");
//    productContent.classList.add("content");

//    //Thêm đường dẫn hình ảnh sản phẩm thẻ img
//    const classIMG = document.createElement("div");
//    classIMG.classList.add("image")
//    const productImage = document.createElement("img");
//    productImage.src = product.image[0];
//    productImage.alt = product.name;
//    classIMG.appendChild(productImage);

//    // Điền thông tin sản phẩm vào thẻ content
//    const productName = document.createElement("h3");
//    productName.classList.add("name-product");
//    productName.textContent = product.name;

//    const productPriceRegular = document.createElement("span");
//    productPriceRegular.classList.add("price-regular");
//    productPriceRegular.textContent = product.priceRegular;

//    const productPriceLast = document.createElement("span");
//    productPriceLast.classList.add("price-last");
//    productPriceLast.textContent = product.priceLast;

//    //Thêm các phần tử vào thẻ content
//    productContent.appendChild(productName);
//    productContent.appendChild(productPriceRegular);
//    if (productPriceLast.textContent != "") {
//       productContent.appendChild(productPriceLast);
//       productContent.children[1].classList.add("sale");
//    }

//    // Thêm các phần tử vào thẻ sản phẩm
//    productCard.appendChild(classIMG);
//    productCard.appendChild(productContent);

//    // Thêm thẻ sản phẩm vào vùng hiển thị sản phẩm
//    productContainer.appendChild(productCard);
// });


// Số sản phẩm hiển thị trên mỗi trang
const productsPerPage = 8;

// Trang hiện tại
let currentPage = 1;

// Hiển thị sản phẩm
function displayProducts(page) {
   // Tính chỉ số bắt đầu và kết thúc của sản phẩm trong trang
   const startIndex = (page - 1) * productsPerPage;
   const endIndex = startIndex + productsPerPage;

   // Lấy danh sách sản phẩm trong trang hiện tại
   const displayedProducts = listProduct.slice(startIndex, endIndex);
   productContainer.innerHTML = "";
   // Hiển thị sản phẩm trong #product-list
   displayedProducts.forEach((product) => {
      // Tạo một thẻ sản phẩm mới từ mẫu thẻ sản phẩm
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.setAttribute('onclick', 'ProductInfo(event)');

      const productContent = document.createElement("div");
      productContent.classList.add("content");

      //Thêm đường dẫn hình ảnh sản phẩm thẻ img
      const classIMG = document.createElement("div");
      classIMG.classList.add("image")
      const productImage = document.createElement("img");
      productImage.src = product.image[0];
      productImage.loading = "lazy";
      productImage.alt = product.name;
      classIMG.appendChild(productImage);

      // Điền thông tin sản phẩm vào thẻ content
      const productName = document.createElement("h3");
      productName.classList.add("name-product");
      productName.textContent = product.name;

      const productPriceRegular = document.createElement("span");
      productPriceRegular.classList.add("price-regular");
      productPriceRegular.textContent = product.priceRegular;

      const productPriceLast = document.createElement("span");
      productPriceLast.classList.add("price-last");
      productPriceLast.textContent = product.priceLast;

      //Thêm các phần tử vào thẻ content
      productContent.appendChild(productName);
      productContent.appendChild(productPriceRegular);
      if (productPriceLast.textContent != "") {
         productContent.appendChild(productPriceLast);
         productContent.children[1].classList.add("sale");
      }

      // Thêm các phần tử vào thẻ sản phẩm
      productCard.appendChild(classIMG);
      productCard.appendChild(productContent);

      // Thêm thẻ sản phẩm vào vùng hiển thị sản phẩm
      productContainer.appendChild(productCard);
   });

   // Tạo phân trang
   const totalPages = Math.ceil(listProduct.length / productsPerPage);
   const pagination = document.getElementById("pagination");
   pagination.innerHTML = "";
   for (let i = 1; i <= totalPages; i++) {
      // Tạo nút cho từng trang
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      if (i === currentPage) {
         pageButton.classList.add("active");
      }
      pageButton.addEventListener("click", () => {
         // Khi người dùng nhấp vào nút trang
         currentPage = i;
         displayProducts(currentPage);
      });
      // Thêm nút vào phân trang
      pagination.appendChild(pageButton);
   }
}

// Khởi tạo trang đầu tiên
displayProducts(currentPage);


