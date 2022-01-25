// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { collection, CollectionReference, DocumentData, getFirestore } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig: FirebaseApp = initializeApp({
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_APP_ID,
});

const firestore: Firestore = getFirestore(firebaseConfig);
const auth: Auth = getAuth(firebaseConfig);
export const projectCollectionRef: CollectionReference<DocumentData> = collection(firestore, "projects");
export const taskCollectionRef: CollectionReference<DocumentData> = collection(firestore, "tasks");

export { firebaseConfig as firebase, firestore, auth };
