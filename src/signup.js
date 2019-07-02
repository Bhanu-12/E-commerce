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


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    window.location.href = "/public/index.html";
    // ...
  } else {
    // User is signed out.

    document.getElementById("logout").style.display = "none";
    // ...
  }
});

function signup() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  // console.log(e);
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
      Swal.fire({
        position: 'top-end',
        toast: true,
        type: 'success',
        title: 'Successfully created user account',
        showConfirmButton: false,
        timer: 5000,

      });
      // console.log("Successfully created user account with uid:", user.uid);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}