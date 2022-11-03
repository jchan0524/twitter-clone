
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

  // Initialize Firebase
firebase.initializeApp(firebaseConfig); 




let renderLogin  = () => {
    $("body").html ('<button id = "login"> LOGIN </button>'); 
     $("#login").on("click", ()=>{
      var provider = new firebase.auth.GoogleAuthProvider();
      const currentDate = new Date(); 
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;


  
    
      // The signed-in user info.
      var user = result.user;

      

     
      
      

      
      // ...
    })
    
    
      });
      
    }

    let renderPage = (loggedIn)=>{
  
        $("body").html('<div id = "user-detail"></div>'); 
        
        if(loggedIn){
          //readUserData(); 

          window.location.href='tweets.html'; 

        
        }
        }

        firebase.auth().onAuthStateChanged(user=>{
            if(!user){
                
              renderLogin(); 
            }
            else {
               
              renderPage(user); 

              
            }
          });

          