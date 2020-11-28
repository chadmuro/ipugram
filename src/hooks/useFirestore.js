import { useState, useEffect } from 'react';
import { db } from '../firebase/config';

export const ReadFirestore = (collection) => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		const unsub = db
			.collection(collection)
			.orderBy('createdAt', 'desc')
			.onSnapshot((snap) => {
				let documents = [];
				snap.forEach((doc) => {
					documents.push({ ...doc.data(), id: doc.id });
				});
				setDocs(documents);
			});

        return () => unsub();
        
	}, [collection]);

	return { docs };
};

export const deleteFromFirestore = (id) => {
    db.collection('images').doc(id).delete().then(() => {
        console.log('deleted from database');
    })
}