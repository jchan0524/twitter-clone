
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDF0MNv-GuDseUpXTOEBV4uarFwgvK9m1Y",
    authDomain: "test-aeb98.firebaseapp.com",
    databaseURL: "https://test-aeb98-default-rtdb.firebaseio.com",
    projectId: "test-aeb98",
    storageBucket: "test-aeb98.appspot.com",
    messagingSenderId: "600021696987",
    appId: "1:600021696987:web:58a3a436d0ec53a536e7fe",
    measurementId: "G-W13P3VC667"
  };

  //import {hi} from './home.js'; 

  // Initialize Firebase
firebase.initializeApp(firebaseConfig); 

const dbRef = firebase.database().ref(); 
const usersRef = dbRef.child('users'); 

readUserData(); 



//const hel = user.email; 
// const user = auth.currentUser;
var currentDate; 
var provider = new firebase.auth.GoogleAuthProvider();
var user; 
var userName; 
var photoURL; 
var emailVerified; 

firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;


  
    
      // The signed-in user info.
      user = result.user;
      userName = user.displayName; 
      const displayName = user.displayName;
      photoURL = user.photoURL;
      
    });







let renderTweet = (tObj, uuid)=>{
//  if (user !== null) {
//  //   The user object has basic properties such as display name, email, etc.
//     const displayName = user.displayName;
  
    
  
  
    
//     emailVerified = user.emailVerified;
  
//     // The user's ID, unique to the Firebase project. Do NOT use
//     // this value to authenticate with your backend server, if
//     // you have one. Use User.getToken() instead.
  
 //}



 
  $("#user-detail").prepend(`
<div class="card" data-uuid = "${uuid}" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${tObj.pic}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${tObj.name.toLocaleString()}</h5>
        <p class="card-text">${tObj.content.toLocaleString()}  </p>
        <p class="card-text"><small class="text-muted">Tweeted at ${tObj.timestamp}</small></p>
      </div>
    </div>
  </div>
</div>
  `);
}



    





function readUserData(){
  const userListUI = document.getElementById("user-list"); 
  

  
  usersRef.on("value", snap=>{
    
   userListUI.innerHTML = ""; 
    
    snap.forEach(childSnap=>{
      let key = childSnap.key,
          value = childSnap.val(); 
      let $li = document.createElement("li"); 
      
      //edit icon 
      let editIconUI = document.createElement("span"); 
      editIconUI.class = "edit-user"; 
      editIconUI.innerHTML = " EDIT"; 
      editIconUI.setAttribute("userid", key); 
      editIconUI.addEventListener("click", editButtonClicked); 
      
       //delete icon 
       let deleteIconUI = document.createElement("span"); 
      deleteIconUI.class = "delete-user"; 
      deleteIconUI.innerHTML = " XX"; 
      deleteIconUI.setAttribute("userid", key); 
      deleteIconUI.addEventListener("click", deleteButtonClicked); 
    
    
      $li.innerHTML = value.name; 
    $li.append(editIconUI); 
      $li.append(deleteIconUI); 
      
      $li.setAttribute("user-key", key); 
      
      $li.addEventListener("click", userClicked); 
      userListUI.prepend($li); 
      
    }); 
  }); 
}







// firebase.auth().onAuthStateChanged(user=>{
//   if(!user){
//     renderLogin(); 
//   }
//   else {
    
//     renderPage(user); 
    
//   }
// });

firebase.auth().onAuthStateChanged(user=>{
  if(!user){
    window.location.href='index.html'; 
  }
 
});


function userClicked(e){
  var userID = e.target.getAttribute("user-key"); 
  const userRef = dbRef.child('users/' + userID); 
  const userDetailUI = document.getElementById("user-detail"); 
  userRef.on("value", snap=>{
    userDetailUI.innerHTML = ""; 
    let tObj = snap.val(); 
    // alert(JSON.stringify(tObj)); 
    
    
    // renderTweet(tObj, snap.key); 
    var $p = document.createElement("p"); 
    
    $p.innerHTML = "Name: " + tObj.name + "\n" + "Tweet: " + tObj.content; 
   
    
    userDetailUI.append($p); 
    renderTweet(tObj, snap.key); 
    
  
    
  //   snap.forEach(childSnap=>{
  //   var $p = document.createElement("p"); 
  //   $p.innerHTML = childSnap.key + " - " + childSnap.content; 
  //   userDetailUI.append($p);

      

  //  }); 
    
   
  }); 
}



const addUserBtnUI = document.getElementById("add-user-btn"); 
addUserBtnUI.addEventListener("click", addUserBtnClicked); 

function addUserBtnClicked(){
  const usersRef = dbRef.child('users'); 
  const addUserInputsUI = document.getElementsByClassName("user-input"); 
  
  
  //new user information 
  let newUser = {}; 
  
  //loop through data 
  
  // for(let i=0, len = addUserInputsUI.length; i<len; i++){
  //   let key = addUserInputsUI[i].getAttribute('data-key'); 
  //   let value = addUserInputsUI[i].value; 
  //   newUser[key]=value; 
  // }
  let key = addUserInputsUI[0].getAttribute('data-key'); 
  let value = addUserInputsUI[0].value; 
  newUser[key]=value;


  key = 'name'; 
  value = userName; 
  newUser[key]=value;

  currentDate = new Date().toLocaleString(); 
  key = 'timestamp'; 
  value = currentDate; 
  newUser[key]=value;

  key = 'pic'; 
  value = photoURL;  
  newUser[key]=value;

  usersRef.push(newUser); 
   
  
  
}

function editButtonClicked(e){
  document.getElementById("edit-user-module").style.display = "block"; 
  document.querySelector(".edit-userid").value = e.target.getAttribute("userid"); 
  const userRef = dbRef.child('users/' + e.target.getAttribute("userid")); 
  
  // set data to the user field 
  const editUserInputsUI = document.querySelectorAll(".edit-user-input"); 
  userRef.on("value", snap=>{
    // for(var i = 0, len = editUserInputsUI.length; i < len; i++){
    //   var key = editUserInputsUI[i].getAttribute("data-key"); 
    //   editUserInputsUI[i].value = snap.val()[key]; 
    // }
    //var key = 'content';  
    var key = editUserInputsUI[0].getAttribute("data-key");
    editUserInputsUI[0].value = snap.val()[key]; 
    alert(editUserInputsUI[0].value); 
    
    
    // editUserInputsUI[key].value = snap.val()[key]; 
    // alert(snap.val()[key]); 

  });
  
  
  const saveBtn = document.querySelector("#edit-user-btn"); 
  saveBtn.addEventListener("click", saveUserBtnClicked); 
}

function saveUserBtnClicked(e){
  
  const userID = document.querySelector(".edit-userid").value; 
  const userRef = dbRef.child("users/" + userID); 
  
  var editedUserObject = {};
  
  const editUserInputsUI = document.querySelectorAll(".edit-user-input"); 
  
  editUserInputsUI.forEach(function (textField){
    let key = textField.getAttribute("data-key"); 
    let value = textField.value; 
    editedUserObject[textField.getAttribute("data-key")] = textField.value; 
  }); 
  
  userRef.update(editedUserObject); 
  
  document.getElementById("edit-user-module").style.display = "none"; 

                             
}

function deleteButtonClicked(e){
  e.stopPropagation(); 
  const userID = e.target.getAttribute("userid"); 
  const userRef= dbRef.child("users/" + userID); 
  userRef.remove(); 
}

