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
  
  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
     const collectionRef = firestore.collection(collectionKey);

     const batch = firestore.batch();
     objectsToAdd.forEach( obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj); 
     })

     return await batch.commit();
  }
  firebase.initializeApp(config);
  export const convertCollectionsSnapshotToMap = (collections) => {
   const transformedCollection = collections.docs.map(doc => {
       const {title,items} = doc.data();
       return {
          routeName:encodeURI(title.toLowerCase()),
          id:doc.id,
          title,
          items
       }
   });
   return transformedCollection.reduce( (accumulator,collection) => {
     accumulator[collection.title.toLowerCase()] = collection;
     return accumulator;
   },{});
  }

  export const getCurrentUser = () => {
     return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
           unsubscribe();
           resolve(userAuth);
        },reject)
     })
  }
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

 export  const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({ prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

  export default firebase;