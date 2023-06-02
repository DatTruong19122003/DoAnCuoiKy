const userCurrent = JSON.parse(localStorage.getItem("customerCurrent"));

console.log(userCurrent);
if (userCurrent === "" || userCurrent === null) {
   const link = document.querySelector('.link');
   link.textContent = "Sign in/up"
   link.href = "../html/login.html";
}
else {
   const cartCount = document.querySelector(".cart-count");
   cartCount.textContent = userCurrent.cart.length;
   console.log("Check");
   document.querySelector('.name-user').textContent = userCurrent.name;
   document.querySelector('.email-user').textContent = userCurrent.email;
   const link = document.querySelector('.link');
   link.setAttribute("onclick", "logOut()");
   link.textContent = "Log Out";
}


localStorage.setItem("customerCurrent", JSON.stringify(userCurrent));

function logOut() {
   const customerCurrent = JSON.parse(localStorage.getItem("customerCurrent"));
   const Customers = JSON.parse(localStorage.getItem("customers"));
   var updateDataCustomer = Customers.find(e => e.name === customerCurrent.name);
   var updateDataCustomer = Customers.find(function (customer) {
      return customer.name === customerCurrent.name;
   });
   updateDataCustomer.cart = customerCurrent.cart;

   localStorage.setItem("customers", JSON.stringify(Customers))
   localStorage.setItem("customerCurrent", JSON.stringify(""));
   location.reload()
}
window.logOut = logOut;


// Hamburger Menu

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".toggle-menu");

hamburger.addEventListener("click", function () {
   this.classList.toggle("active");
   menu.classList.toggle("active");
});

function ProductInfo(event) {
   const nameProduct = event.currentTarget.querySelector('.name-product').textContent;
   var productPageURL = "../html/product-page.html" + "?name=" + nameProduct;
   console.log(productPageURL);
   window.location.href = productPageURL;
}
window.ProductInfo = ProductInfo;