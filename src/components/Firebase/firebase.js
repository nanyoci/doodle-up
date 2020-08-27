import app from 'firebase/app';
import 'firebase/auth';
 
const config = {
  apiKey: "AIzaSyAAjQHpT4ykVr2km5EdKleMKwUxMyaBJrI",
  authDomain: "doodle-up-cz3002.firebaseapp.com",
  databaseURL: "https://doodle-up-cz3002.firebaseio.com",
  projectId: "doodle-up-cz3002",
  storageBucket: "doodle-up-cz3002.appspot.com",
  messagingSenderId: "1491395153",
  appId: "1:1491395153:web:18b8fc993d8e0222060e70",
  measurementId: "G-16T5Y1NZR2"
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);
 
    this.auth = app.auth();
  }
 
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) => {
    console.log('created account if no errors...');
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  // doCreateUserWithEmailAndPassword = (email, password) => {
  //   console.log(email, password, 'credentials in fb class');
  //   this.auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then(response => console.log(response))
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log(errorCode, errorMessage, 'error creating acc');
  //     // ...
  //   })};

  // doSignInWithEmailAndPassword = (email, password) =>
  //   this.auth.signInWithEmailAndPassword(email, password);
 
  // doSignOut = () => this.auth.signOut();
 
  // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  // doPasswordUpdate = password =>
  //   this.auth.currentUser.updatePassword(password);
}
 
export default Firebase;