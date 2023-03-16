import { db, storage } from '../utils';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
	doc,
	addDoc,
	updateDoc,
	collection,
	getDocs,
	deleteDoc,
	getDoc
} from 'firebase/firestore';

export const addProduct = async (product) => {
	const { name, price, image, quantity, description } = product;

	try {
		// dodawanie produktu do bazy danych Firestore
		const docRef = await addDoc(collection(db, 'products'), {
			name: name,
			price: price,
			quantity: quantity,
			imageURL: '',
			description: description,
		});
		const productId = docRef.id;

		// przesyłanie pliku zdjecia do firebase storage
		let imageURL = '';
		if (image) {
			const imageRef = ref(storage, `images/products/${productId}`);
			console.log(imageRef);
			await uploadBytes(imageRef, image);
			imageURL = await getDownloadURL(imageRef);

			// aktualizacja pola imageURL w dokumencie produktu w Firestore
			const productDocRef = doc(db, 'products', productId);
			await updateDoc(productDocRef, {
				imageURL: imageURL,
			});

			// zwrócenie danych nowo utworzonego produktu
			return {
				id: productId,
				name: name,
				price: price,
				quantity: quantity,
				imageURL: imageURL || '',
				description: description,
			};
		}
	} catch (err) {
		throw new Error(err.message);
	}
};

export const fetchProducts = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'products'));
		const productsData = querySnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		return productsData;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const removeProduct = async (id) => {
	try {
		const res = await deleteDoc(doc(db, 'products', id));
		return res;
	} catch (err) {
		throw new Error(err.message);
	}
};

export const fetchProductById = async (productId) => {
	try {
		const docRef = doc(db, 'products', productId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			const product = docSnap.data();
			return { id: docSnap.id, ...product };
		} else {
			return null;
		}
	} catch (err) {
		throw new Error(err.message);
	}
};
