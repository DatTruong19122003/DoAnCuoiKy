
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
   container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
   container.classList.remove("right-panel-active");
});

// Lấy các phần tử HTML cần sử dụng
const formSignUp = document.querySelector('#form-signup');
const nameSignUp = document.querySelector('#name');
const emailSignUp = document.querySelector('#Email-signup');
const passwordSignUp = document.querySelector('#Pwd-signup');

// Khi form được submit
formSignUp.addEventListener('submit', function (event) {
   event.preventDefault(); // Ngăn chặn form submit lại
   let customers = JSON.parse(localStorage.getItem("customers"));

   if (!customers) {
      customers = [];
      localStorage.setItem("customers", JSON.stringify(customers));
   }

   // Lấy giá trị của các trường input
   const nameValue = nameSignUp.value;
   const emailValue = emailSignUp.value;
   const passwordValue = passwordSignUp.value;
   const cart = [];

   // Kiểm tra xem tên, email và mật khẩu có đủ dài không
   if (nameValue.length < 1 || emailValue.length < 1 || passwordValue.length < 1) {
      alert('Vui lòng nhập đầy đủ thông tin đăng ký');
      return;
   }

   if (customers.find(item => item.email === emailValue)) {
      alert('Email này đã được đăng kí vui lòng sử dụng Email khác ');
      return;
   }

   // Tạo một đối tượng user mới
   const customer = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      cart: cart,
   };

   // Lưu đối tượng user vào localstorage
   customers.push(customer)
   localStorage.setItem("customers", JSON.stringify(customers));

   // Thông báo đăng ký thành công
   alert('Đăng ký tài khoản thành công !!!');
});

// Lấy các phần tử HTML cần sử dụng
const formSignIn = document.querySelector('#form-signin');
const emailSignIn = document.querySelector('#Email-signin');
const passwordSignIn = document.querySelector('#Pwd-signin');

// Khi form được submit
formSignIn.addEventListener('submit', function (event) {
   event.preventDefault(); // Ngăn chặn form submit lại


   const emailValue = emailSignIn.value;
   const passwordValue = passwordSignIn.value;

   let customerCurrent = JSON.parse(localStorage.getItem("customerCurrent"));

   if (!customerCurrent) {
      customerCurrent = "";
      localStorage.setItem("customerCurrent", JSON.stringify(customerCurrent));
   }
   console.log(customerCurrent);
   if (emailValue.length < 1 || passwordValue.length < 1) {
      alert('Vui lòng nhập đầy đủ thông tin đăng nhập');
      return;
   }

   let customers = JSON.parse(localStorage.getItem("customers"));
   if (!customers) {
      customers = [""];
      localStorage.setItem("customers", JSON.stringify(customers));
   }


   var checkAccount = customers.find(item => item.email === emailValue);
   console.log(checkAccount);
   if (checkAccount != undefined) {
      if (checkAccount.password == passwordValue) {
         alert("Đăng nhập thành công !!!");
         customerCurrent = checkAccount;
         localStorage.setItem("customerCurrent", JSON.stringify(customerCurrent));
         window.location.href = '../index.html';
      }
      else {
         alert("Sai mật khẩu !!!");
         document.getElementById('Pwd-signin').value = "";
      }
   }
   else {
      alert("Không tìm thấy tài khoản !!!");
   }
});



