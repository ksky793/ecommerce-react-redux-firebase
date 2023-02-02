import { firebaseConfig } from './config';

import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore';

// połączenie z baza firebase
const app = initializeApp(firebaseConfig);

// inicjalizacja
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;

// logowanie z google
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
	try {
		const res = await signInWithPopup(auth, googleProvider);
		const user = res.user;

		const q = query(collection(db, 'users'), where('uid', '==', user.uid));
		const docs = await getDocs(q);
		if (docs.docs.length === 0) {
			await addDoc(collection(db, 'users'), {
				uid: user.uid,
				name: user.displayName,
				authProvider: 'google',
				email: user.email,
			});
		}
	} catch (err) {
		console.error(err);
	}
};

// logowanie za pomoca maila i hasła
export function logInWithEmailAndPassword(email, password) {
	return new Promise((resolve, reject) => {
		const data = signInWithEmailAndPassword(auth, email, password);
		if (data) {
			resolve(data);
		} else {
			reject();
		}
	});
}

// resetowanie hasła
export const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email);
		alert('Password reset link sent!');
	} catch (err) {
		console.error(err);
		alert(err.message);
	}
};

export const logout = async () => {
	await signOut(auth);
};

// rejestracja za pomocą emaila i hasła
export const registerWithEmailAndPassword = async (
	fullName,
	email,
	password
) => {
	return new Promise((resolve, reject) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((data) => {
				const user = data.user;
				addDoc(collection(db, 'users'), {
					uid: user.uid,
					name: fullName,
					authProvider: 'local',
					email: email,
				});
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			});
	});
};
