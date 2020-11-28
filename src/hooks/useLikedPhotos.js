import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { db } from '../firebase/config';

export const AddLikedImages = (userId, imageId) => {
	db.collection('users')
		.doc(userId)
		.update({
			likedImages: firebase.firestore.FieldValue.arrayUnion(imageId),
		});
	db.collection('images')
		.doc(imageId)
		.update({
			numLikes: firebase.firestore.FieldValue.increment(1),
		});
};

export const RemoveLikedImages = (userId, imageId) => {
	db.collection('users')
		.doc(userId)
		.update({
			likedImages: firebase.firestore.FieldValue.arrayRemove(imageId),
		});
	db.collection('images')
		.doc(imageId)
		.update({
			numLikes: firebase.firestore.FieldValue.increment(-1),
		});
};

export const GetLikedImages = userId => {
	const [likedImages, setLikedImages] = useState([]);

	useEffect(() => {
		if (userId) {
			const unsub = db
				.collection('users')
				.doc(userId)
				.onSnapshot(doc => {
					setLikedImages({ ...doc.data() });
				});
			return () => unsub();
		}
	}, [userId]);

	return likedImages;
};
