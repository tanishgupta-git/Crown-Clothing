import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC0DS38otKlycS0KLjHS0fp9o3goc8--is",
    authDomain: "clothingweb-b51ec.firebaseapp.com",
    databaseURL: "https://clothingweb-b51ec.firebaseio.com",
    projectId: "clothingweb-b51ec",
    storageBucket: "clothingweb-b51ec.appspot.com",
    messagingSenderId: "158699612461",
    appId: "1:158699612461:web:9d0906acfc909a913d4ba4",
    measurementId: "G-2DDS0KBN1C"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
     if(!userAuth) return;
      
     const userRef = firestore.doc(`users/${userAuth.uid}`);
     const snapShot = await userRef.get();
     if(!snapShot.exists){
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try{
         await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
         })
        }catch(error){
           console.log('error creating user ',error.message);
        }
     }

     return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;