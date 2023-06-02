import { products } from "./Product.js";


var urlParams = new URLSearchParams(window.location.search);
var productName = urlParams.get("name");
var product = products.find(item => item.name === productName);
var imgFluit = document.querySelector(".img-fluit");

document.querySelector(".title").textContent = productName;
document.querySelector("#img-1").src = product.image[0];
document.querySelector("#img-2").src = product.image[1];
document.querySelector("#img-3").src = product.image[2];
document.querySelector(".price-last").textContent = product.priceLast;
document.querySelector(".price-regular").textContent = product.priceRegular;
imgFluit.src = product.image[0];

if (product.priceLast === "") {
   document.querySelector(".sale").classList.add('hide');
}
else {
   document.querySelector(".price-regular").classList.add('sale');
}

if (product.size.length == 0) {
   document.querySelector(".size").classList.add('hide');
   document.querySelector(".size").removeAttribute('required');
}
else {
   product.size.forEach(element => {
      const optionElement = document.createElement('option');
      optionElement.textContent = element;
      optionElement.value = element;
      document.querySelector(".size").add(optionElement);
   });
}


document.querySelector("#img-1").addEventListener("click", function () {
   imgFluit.src = this.src;
});
document.querySelector("#img-2").addEventListener("click", function () {
   imgFluit.src = this.src;
});
document.querySelector("#img-3").addEventListener("click", function () {
   imgFluit.src = this.src;
});

/* RECOMMEND */
const remainingProducts = products.filter(product => product.name !== productName);
const randomProducts = getRandomProducts(remainingProducts, 4);
function getRandomProducts(products, count) {
   const randomProducts = [];
   const totalProducts = products.length;

   // Kiểm tra nếu số lượng sản phẩm cần lấy lớn hơn tổng số sản phẩm trong danh sách
   if (count >= totalProducts) {
      return products;
   }

   while (randomProducts.length < count) {
      const randomIndex = Math.floor(Math.random() * totalProducts);
      const randomProduct = products[randomIndex];

      // Kiểm tra xem sản phẩm đã được chọn có trong danh sách sản phẩm ngẫu nhiên chưa
      if (!randomProducts.some(product => product.name === randomProduct.name)) {
         randomProducts.push(randomProduct);
      }
   }
   return randomProducts;
}

console.log(randomProducts);


const productContainer = document.getElementById("product-container");
randomProducts.forEach((product) => {
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
   console.log(productCard);
   productContainer.appendChild(productCard);
});

/* ZOOM */
const zoomer = document.querySelector('.zoomer')
const wrapImg = document.querySelectorAll('.zoomer .image')
const result = document.querySelector('.zoomer .result')

const size = 2

wrapImg.forEach((item) => {
   item.addEventListener('mousemove', function (e) {
      result.classList.remove('hide')

      const img = item.querySelector('img')

      let x = (e.offsetX / this.offsetWidth) * 100
      let y = (e.offsetY / this.offsetHeight) * 100

      // move result
      let posX = e.pageX - zoomer.offsetLeft
      let posY = e.pageY - zoomer.offsetTop

      result.style.cssText = `
			background-image: url(${img.src});
			background-size: ${img.width * size}px ${img.height * size}px;
			background-position : ${x}% ${y}%;
			left: ${posX}px;
			top: ${posY}px;
		`
   })

   item.addEventListener('mouseleave', function (e) {
      result.style = ``
      result.classList.add('hide')
   })
})

function onSubmitForm(event) {
   event.preventDefault();

   const customerCurrent = JSON.parse(localStorage.getItem("customerCurrent"));

   const nameProduct = document.querySelector(".title");
   const imageProduct = document.querySelector("#img-1");
   const sizeProduct = document.querySelector(".size");
   const quantityProduct = document.querySelector(".quantity-box");
   let priceProduct = document.querySelector(".price-last");

   if (customerCurrent === "" || customerCurrent == null) {
      alert("Vui lòng đăng nhập tài khoản !!!");
      return;
   }

   if (priceProduct.textContent == "") {
      priceProduct = document.querySelector(".price-regular");
   }

   var productToUpdate = customerCurrent.cart.find(function (product) {
      return product.name === nameProduct.textContent && product.size === sizeProduct.value;
   });

   if (productToUpdate) { // Kiểm tra sản phẩm có tồn tại hay không
      productToUpdate.quantity += parseInt(quantityProduct.value);
   } else {
      const product = {
         name: "",
         image: "",
         price: "",
         size: "",
         quantity: 0,
      }
      product.name = nameProduct.textContent;
      product.image = imageProduct.src;
      product.price = priceProduct.textContent;
      product.size = sizeProduct.value;
      product.quantity = parseInt(quantityProduct.value);

      customerCurrent.cart.push(product);
   }



   localStorage.setItem("customerCurrent", JSON.stringify(customerCurrent));
   alert("Đã thêm sản phẩm vào giỏ hàng !!!");
   location.reload();
   return false;
}
window.onSubmitForm = onSubmitForm

