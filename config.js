  import firebase from 'firebase';
  
  const firebaseConfig = {
    apiKey: "AIzaSyBh3bQuu1eiaL9TuFhgL7pIqlmmD8IzYKQ",
    authDomain: "quizmasterapp-c8c32.firebaseapp.com",
    databaseURL: "https://quizmasterapp-c8c32-default-rtdb.firebaseio.com",
    projectId: "quizmasterapp-c8c32",
    storageBucket: "quizmasterapp-c8c32.appspot.com",
    messagingSenderId: "535605617327",
    appId: "1:535605617327:web:e5b8db49201c2aa5622a5a"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.database();