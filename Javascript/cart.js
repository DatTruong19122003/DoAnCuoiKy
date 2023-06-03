// Lấy sản phẩm từ Local Storage
const customerCurrent = JSON.parse(localStorage.getItem('customerCurrent'));

const cartContainer = document.querySelector('.Products');
const subToTal = document.querySelector('.sub-total .price');
const title = document.querySelector('.title');
const products = document.querySelector('.products');
const cartWarning = document.querySelector('.cart-warning');
const cart_loginText = document.querySelector('.cart_login-text');
const cart_loginTitle = document.querySelector('.cart_login-title');
var subtotal = 0;

if (customerCurrent == null || customerCurrent == "" || customerCurrent.cart.length == 0) {
	title.classList.add("hide");
	products.classList.add("hide");
	cartWarning.classList.remove("hide");
	if (customerCurrent == null || customerCurrent == "") {
		cart_loginText.classList.remove("hide");
		cart_loginTitle.classList.remove("hide");
	}
}


// Tạo các sản phẩm trong giỏ hàng dựa vào số lượng sản phẩm
for (let i = 0; i < customerCurrent.cart.length; i++) {
	// Tạo các phần tử HTML tương ứng với sản phẩm
	const productContainer = document.createElement('div');
	productContainer.className = 'product';

	const productImage = document.createElement('img');
	productImage.className = 'product-image';
	productImage.src = customerCurrent.cart[i].image;
	productImage.alt = '';

	const productDescription = document.createElement('div');
	productDescription.className = 'product-description';
	const productName = document.createElement('p');
	productName.className = 'name';
	productName.textContent = customerCurrent.cart[i].name;
	const productPrice = document.createElement('p');
	productPrice.className = `price price-${i + 1}`;
	productPrice.textContent = customerCurrent.cart[i].price;
	const productSize = document.createElement('p');
	productSize.className = 'size';
	if (customerCurrent.cart[i].size != "")
		productSize.textContent = "size:" + customerCurrent.cart[i].size;

	productDescription.appendChild(productName);
	productDescription.appendChild(productPrice);
	productDescription.appendChild(productSize);

	// ... Tạo các phần tử HTML khác tương ứng
	const quantity_number = customerCurrent.cart[i].quantity;
	var toTal = total(customerCurrent.cart[i].price, customerCurrent.cart[i].quantity);
	var priceNumber = convertPricetoInt(toTal);
	subtotal += parseInt(priceNumber);
	const productQuantity = `
    <div class="product-quantity">
        <div id="quantity-field">
            <button onclick="increaseQuantity(event, this)">+</button>
            <input type="text" id="${i + 1}" value="${quantity_number}" />
            <button onclick="decreaseQuantity(event, this)">-</button>
        </div>
        <div class="remove-product">
            <i class="ri-delete-bin-6-line" onclick="deleteProduct(${i + 1})"></i>
        </div>
    </div>
		<div class="product-total" id="total-${i + 1}">${toTal}</div>
`;

	// Chèn các phần tử vào phần tử cha
	productContainer.appendChild(productImage);
	productContainer.appendChild(productDescription);
	// ... Chèn các phần tử HTML khác vào productContainer

	// Chèn productContainer vào container chứa các sản phẩm trong giỏ hàng
	cartContainer.appendChild(productContainer);
	productContainer.insertAdjacentHTML('beforeend', productQuantity);
}

subToTal.textContent = convertInttoPrice(subtotal);


function total(price, quantity) {
	price = convertPricetoInt(price);
	quantity = parseInt(quantity);
	result = price * quantity;
	result = convertInttoPrice(result);
	return result;
}


function increaseQuantity(event, button) {
	var customerCurrent = JSON.parse(localStorage.getItem('customerCurrent'));
	var input = button.nextElementSibling;
	var quantity = parseInt(input.value);
	var totalChange = document.getElementById(`total-${input.id}`);
	var price = document.getElementsByClassName(`price-${input.id}`);
	const cartCount = document.querySelector(".cart-count");
	let totalQuantity = parseInt(cartCount.textContent);

	input.value = quantity + 1;
	totalChange.textContent = total(price[0].textContent, quantity + 1)
	customerCurrent.cart[input.id - 1].quantity = quantity + 1;
	subtotal += convertPricetoInt(price[0].textContent);
	subToTal.textContent = convertInttoPrice(subtotal);
	totalQuantity += 1
	cartCount.textContent = totalQuantity;

	localStorage.setItem("customerCurrent", JSON.stringify(customerCurrent));
	event.preventDefault()
}
const cartCount = document.querySelector(".cart-count");
let totalQuantity = parseInt(cartCount.textContent);
function decreaseQuantity(event, button) {
	var customerCurrent = JSON.parse(localStorage.getItem('customerCurrent'));
	var input = button.previousElementSibling;
	var quantity = parseInt(input.value);
	var totalChange = document.getElementById(`total-${input.id}`);
	var price = document.getElementsByClassName(`price-${input.id}`);
	const cartCount = document.querySelector(".cart-count");
	let totalQuantity = parseInt(cartCount.textContent);

	if (quantity > 1) {
		input.value = quantity - 1;
		totalChange.textContent = total(price[0].textContent, quantity - 1)
		customerCurrent.cart[input.id - 1].quantity = quantity - 1;
		subtotal -= convertPricetoInt(price[0].textContent);
		subToTal.textContent = convertInttoPrice(subtotal);
		localStorage.setItem("customerCurrent", JSON.stringify(customerCurrent));
		totalQuantity -= 1;
		cartCount.textContent = totalQuantity;
	}
	else {
		deleteProduct(input.id);
	}

	event.preventDefault()
}

function deleteProduct(id) {
	var result = confirm("Bạn có chắc chắn muốn xóa sản phẩm?");
	if (result) {
		// Người dùng đã chọn "OK", tiến hành xóa sản phẩm
		// Viết code xử lý xóa sản phẩm ở đây
		var customerCurrent = JSON.parse(localStorage.getItem('customerCurrent'));
		customerCurrent.cart.splice(id - 1, 1);
		localStorage.setItem("customerCurrent", JSON.stringify(customerCurrent));
		location.reload();
	}
}

function convertPricetoInt(price) {
	var priceNumber = parseInt(price.replace(/\./g, '').replace('đ', ''));
	return priceNumber;
}

function convertInttoPrice(priceNumber) {
	var formattedPrice = parseInt(priceNumber).toLocaleString("vi-VN") + " đ";
	return formattedPrice;
}