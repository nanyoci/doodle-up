import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);
 
    this.auth = app.auth();
    this.db = app.database();
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

  doSignInWithEmailAndPassword = (email, password) => {
    console.log('account logged in if no errors...');
    return this.auth.signInWithEmailAndPassword(email, password);
  }
 
  doSignOut = () => {
    console.log('account logged out if no errors...');
    return this.auth.signOut();
  }
 
  doResetPassword = email => {
    console.log('account resetted if no errors...');
    return this.auth.sendPasswordResetEmail(email);
  }
 
  // doChangePassword = password => {
  //   console.log('account changing password');
  //   return this.auth.currentUser.updatePassword(password);
  // }

    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
 
    users = () => this.db.ref('users');
}
 
export default Firebase;