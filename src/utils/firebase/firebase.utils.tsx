import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, NextOrObserver  } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection, // allow us to get a collection reference
  writeBatch, // use to perform write to a database
  query,
  getDocs,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import { Category } from '../../store/categories/category.types';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDX_xG69k3e7z5yHZQi7re7p3W3qaabHjM",
    authDomain: "frekes-clothing-db.firebaseapp.com",
    projectId: "frekes-clothing-db",
    storageBucket: "frekes-clothing-db.appspot.com",
    messagingSenderId: "325119454338",
    appId: "1:325119454338:web:9444b26afa243864e3d89b"
};

  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (
  collectionKey: string, 
  objectsToAdd: T[], 
  ): Promise<void> => {
    const collectionRef = collection(db, collectionKey)

    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    })

  await batch.commit();
  console.log("Done");
  // Transaction is a word that represent a successful unit of work to a database, it might be writing mutiple/singe unit documet to a db.
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {

  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  // await Promise.reject(new Error('new error woops'))
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category );

}

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth = async (
    userAuth: User, 
    additionalInformation = {} as AdditionalInformation
  ): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid)

  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('Error creating the user', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback,);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    )
  })
}