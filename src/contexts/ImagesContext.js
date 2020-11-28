import React, { useState, useEffect, createContext } from 'react';
import { db } from '../firebase/config';

export const ImagesContext = createContext();

const ImagesProvider = props => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const unsub = db
			.collection('images')
			.orderBy('numLikes', 'desc')
			.orderBy('createdAt', 'desc')
			.onSnapshot(snap => {
				let documents = [];
				snap.forEach(doc => {
					documents.push({ ...doc.data(), id: doc.id });
				});
				setImages(documents);
			});
		return () => unsub();
	}, []);


	return (
        <ImagesContext.Provider value={{ images }}>
            {props.children}
        </ImagesContext.Provider>
    );
};

export default ImagesProvider;
