import { db } from '../utils';
import {
	doc,
	addDoc,
	updateDoc,
	collection,
	getDocs,
	deleteDoc,
	getDoc,
} from 'firebase/firestore';

export const fetchCategories = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'categories'));
		const categoriesData = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return categoriesData;
	} catch (err) {
		throw new Error(err.message);
	}
};
