const firebaseConfig = {
  apiKey: "AIzaSyC23RED9QvNjDbghmD_2SKTksPXKgZIRwI",
  authDomain: "e-commerce-65c9f.firebaseapp.com",
  databaseURL: "https://e-commerce-65c9f.firebaseio.com",
  projectId: "e-commerce-65c9f",
  storageBucket: "",
  messagingSenderId: "819029909981",
  appId: "1:819029909981:web:467fa9fbc143dd44"
};

firebase.initializeApp(firebaseConfig);

var products = [];
var cartItems = [];
var cart_n = document.getElementById('cart_n');

var phoneDiv = document.getElementById("phonesDiv");
var Phones = [{
    name: 'Google Pixel',
    price: 40000
  },
  {
    name: ' Samsung S7',
    price: 50000
  }, {
    name: 'HTC 10',
    price: 30000
  }, {
    name: 'HTC 10 White',
    price: 30000
  }, {
    name: 'HTC Desire',
    price: 20000
  }, {
    name: 'Iphone',
    price: 60000
  }, {
    name: 'Iphone7',
    price: 20000
  }, {
    name: 'Smashed Iphone',
    price: 1000
  }
];

const phoneProducts = (con) => {
  let url = `/public/img/product${con}.png`;
  let btn = `btnPhones${con}`;
  // console.log(url);
  return `
    <div class = "col-md-4">
      <div class = "card mb-4 shadow-sm">
        <img class = "card-img-top" style = "height:16rem;" src = "${url}" alt="Card Image"> 
        <div class = "card-body> 
          <p class = "card-text" > 
          ${ Phones[con - 1].name}</p>
          <p class = "card-text"> 
          Price: ${Phones[con - 1].price} </p> 
          <div class = "d-flex justify-content-between align-items-center" >
        <div class = "btn-group" >
          <button type = "button"
          onClick = "cart2(
          '${Phones[con-1].name}',
          '${Phones[con-1].price}',
          '${url}',
          '${con}',
          '${btn}') "
      class = "btn btn-sm btn-outline-secondary" >
        <a href="/public/cart.html" style = "color:inherit;"> Buy</a></button>

      <button id = "${btn}" type = "button "
      onClick = "cart(
        '${Phones[con - 1].name}',
        '${Phones[con-1].price}',
        '${url}',
        '${con}',
        '${btn}'
    )
    "
    class = "btn btn-sm btn-outline-secondary" >
      Add To Cart </button> 
      </div> 
      </div> 
      </div> 
      </div> 
      </div>
  `
}

function animation() {
  Swal.fire({
    position: 'top-end',
    toast: true,
    type: 'success',
    title: 'Added to shopping cart',
    showConfirmButton: false,
    timer: 1000,
    customClass: {
      popup: 'animated tada'
    }
  });
};



let cart = (name, price, url, con, btncart) => {
  var item = {
    name: name,
    price: price,
    url: url
  }
  cartItems.push(item);
  let storage = JSON.parse(localStorage.getItem("cart"));
  if (storage == null) {
    products.push(item);
    localStorage.setItem("cart", JSON.stringify(products));
  } else {
    products = JSON.parse(localStorage.getItem("cart"));
    products.push(item);
    localStorage.setItem("cart", JSON.stringify(products));
  }
  products = JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML = ` <i class="text-warning fas fa-shopping-cart"></i> Shopping Cart[${products.length}]`;
  document.getElementById(btncart).style.display = "none";
  animation();
};
let cart2 = (name, price, url, con, btncart) => {
  var item = {
    name: name,
    price: price,
    url: url
  }
  cartItems.push(item);
  let storage = JSON.parse(localStorage.getItem("cart"));
  if (storage == null) {
    products.push(item);
    localStorage.setItem("cart", JSON.stringify(products));
  } else {
    products = JSON.parse(localStorage.getItem("cart"));
    products.push(item);
    localStorage.setItem("cart", JSON.stringify(products));
  }
  products = JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML = ` <i class="text-warning fas fa-shopping-cart"></i> Shopping Cart[${products.length}]`;
  document.getElementById(btncart).style.display = "none";
  // animation();
};

function signOut() {
  firebase.auth().signOut().then(function () {
    Swal.fire({
      position: 'top-end',
      toast: true,
      type: 'success',
      title: 'Logged out succesfully',
      showConfirmButton: false,
      timer: 1000,

    });
    // alert("Sign-out successful.");
  }).catch(function (error) {
    // alert("An error happened.");
  });
};

function render() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // var displayName = user.displayName;
      var email = user.email;
      // console.log(email);
      // User is signed in.
      document.getElementById("login").innerHTML = `${email}`
      document.getElementById("logout").style.display = "block"
      // ...
    } else {
      // User is signed out.
      document.getElementById("login").innerHTML = "login"
      document.getElementById("logout").style.display = "none"

      // ...
    }
  });
  // logout();
  for (let index = 1; index <= 8; index++) {
    phoneDiv.innerHTML += `${phoneProducts(index)}`;
  }
  if (localStorage.getItem("cart") == null) {

  } else {
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = ` <i class="text-warning fas fa-shopping-cart"></i> Shopping Cart[${products.length}]`;
  }
}