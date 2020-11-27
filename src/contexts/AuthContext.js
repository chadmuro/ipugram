import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const AuthProvider = props => {
	const [user, setUser] = useState({});

	useEffect(() => {
		const unsub = auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return () => unsub();
	}, [user]);

	return (
		<AuthContext.Provider value={{ user }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
