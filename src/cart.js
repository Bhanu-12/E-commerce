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


var products = JSON.parse(localStorage.getItem("cart"));
var cartItems = [];
var cart_n = document.getElementById('cart_n');
var table = document.getElementById("table");
var total = 0;

function tableHtml(i) {
  return `
      <tr>
          <th scope = "row" >${i+1}</th> 
          <td><img style="width:90px;" src="${products[i].url}"></td>
          <td>${products[i].name}</td>
          <td>1</td>
          <td>${products[i].price}</td>
        </tr>
  `
}

function buy() {
  var d = new Date();
  var t = d.getTime();
  var counter = t;
  counter += 1;
  let db = firebase.database().ref("order/" + counter);
  let itemdb = {
    id: counter,
    order: counter - 895,
    total: total
  }
  db.set(itemdb);

  Swal.fire({
    position: 'center',
    type: 'success',
    title: 'Purchase made succesfully!',
    text: `Your puchase order is ${itemdb.order}`,
    showConfirmButton: true,
    timer: 5000
  });
  clean();
}

function clean() {
  localStorage.clear();
  for (let i = 0; i < products.length; i++) {
    table.innerHTML += tableHtml(i);
    total += parseInt(products[i].price);
  }
  total = 0;
  table.innerHTML = `
    <tr >
      <th scope="col"> </th>  
      <th scope="col"></th> 
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"></th>
      </tr>
  `;
  cart_n.innerHTML = '';
  document.getElementById("btnBuy").style.display = "none";
  document.getElementById("btnClean").style.display = "none";
}

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
for (let i = 0; i < products.length; i++) {
  table.innerHTML += tableHtml(i);
  total += parseInt(products[i].price);
}
table.innerHTML += `
    <tr >
      <th scope="col"> </th>  
      <th scope="col"></th> 
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col">Total: ₹${total}</th>
      </tr>
      <tr>
      <th scope="col"> </th>  
      <th scope="col"></th> 
      <th scope="col"></th>
      <th scope="col"></th>
      <th scope="col"><button id="btnClean" onClick="clean()" class="btn text-white btn-warning">Clean Shopping Cart</button>
      </th>
      <th scope="col"><button id="btnBuy" onClick="buy()" class="btn btn-success">Buy</button>
      </th>
      </tr>
  `;
products = JSON.parse(localStorage.getItem("cart"));
cart_n.innerHTML = `[${products.length}]`;
}