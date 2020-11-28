import { useState, useEffect } from 'react';
import { storage, db, timestamp } from '../firebase/config';

export const useStorage = file => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		// references
		const storageRef = storage.ref(file.name);
		const collectionRef = db.collection('images');

		storageRef.put(file).on(
			'state_changed',
			snap => {
				let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
				setProgress(percentage);
			},
			err => {
				setError(err);
			},
			async () => {
				const url = await storageRef.getDownloadURL();
				const createdAt = timestamp();
				collectionRef.add({ url, createdAt, name: file.name, numLikes: 0 });
				setUrl(url);
			}
		);
	}, [file]);

	return { progress, url, error };
};

export const deleteFromStorage = file => {
	const storageRef = storage.ref();
	const imagesRef = storageRef.child(file);

	imagesRef.delete().then(() => {
		console.log('file deleted from storage');
	});
};
