import { products } from "./Product.js";

function searchProducts(keyword) {
  let results = []
  for (let i = 0; i < products.length; i++) {
    if (keyword && products[i].name.toLowerCase().includes(keyword.toLowerCase())) {
      results.push(products[i])
    }
  }
  return results
}


document.getElementById("search-input").addEventListener("keyup", function () {
  searchAndDisplayResults();
})

function searchAndDisplayResults() {
  let keyword = document.getElementById("search-input").value;
  let result = searchProducts(keyword);

  let searchResults = document.getElementById("search-results");
  searchResults.innerHTML = ""; // Xóa kết quả cũ

  if (result.length > 0) {
    for (let i = 0; i < result.length; i++) {
      searchResults.innerHTML += `<div onclick="displayProductInfo(event)"><img src="${result[i].image[0]}" alt="${result[i].name}" loading="lazy"/>${result[i].name}</div>`;
    }
    searchResults.innerHTML += `<div onclick="searchFor()">Seach for "${keyword}"<i class="ri-arrow-right-line"></i></div>`;
  } else if (keyword.length > 0) {
    searchResults.innerHTML = "<div>Không tìm thấy kết quả</div>"
  }
}

function searchFor() {
  let keyword = document.getElementById("search-input").value;
  if (keyword.length > 0) {
    var Url = "../html/shop.html" + "?search=" + keyword;
    window.location.href = Url;
  }
}
window.searchFor = searchFor;

function displayProductInfo(event) {
  var nameProduct = event.target.textContent;
  var productPageURL = "../html/product-page.html" + "?name=" + nameProduct;
  window.location.href = productPageURL;
}
window.displayProductInfo = displayProductInfo;


const currentWindow = document.querySelector(".header-search-bar");

// Bắt sự kiện click trên toàn bộ trang
document.addEventListener("click", function (event) {
  // Kiểm tra xem sự kiện click xảy ra trong cửa sổ hiện tại hay không
  if (!currentWindow.contains(event.target)) {
    // Đóng cửa sổ hiện tại
    currentWindow.children[2].classList.add("hide");
  }
  else {
    currentWindow.children[2].classList.remove("hide");
  }
});