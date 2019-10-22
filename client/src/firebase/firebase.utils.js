//import only what you want
// firebase-app - The core firebase client (required).
// firebase-auth - Firebase Authentication (optional).
// firebase-firestore - Cloud Firestore (optional).
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

//import FIREBASE_SECRETS from './firebase.my-secrets'
//firebase.initializeApp(FIREBASE_SECRETS)

const config = {
  apiKey: 'AIzaSyBliM3DGe6TWxMIEDX5-uc0S-4-vU7JXzY',
  authDomain: 'crwn-db-d43db.firebaseapp.com',
  databaseURL: 'https://crwn-db-d43db.firebaseio.com',
  projectId: 'crwn-db-d43db',
  storageBucket: '',
  messagingSenderId: '293229064671',
  appId: '1:293229064671:web:c824d5f3d500cfb48bd46a',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    console.log('!!! userAuth does not exist.')
    return
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  // console.log('Got userRef:', userRef)

  const snapShot = await userRef.get()
  // console.log('Got user snapShot:', snapShot.data())

  // if user object doesn't exist create it
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.error('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey)
  console.log(collectionRef)

  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    // get a new empty document reference in the collection () makes Firestore generate the key
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items,
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// https://firebase.google.com/docs/auth/web/google-signin
const provider = new firebase.auth.GoogleAuthProvider()

// https://firebase.google.com/docs/reference/js/firebase.auth.GoogleAuthProvider?hl=vi#set-custom-parameters
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

// so now we've created the firebase app, auth, and store
// to use externally within the program
