import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const AuthProvider = props => {
	const [user, setUser] = useState({});
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		const unsub = auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
				auth.currentUser.getIdTokenResult().then(idTokenResult => {
					setAdmin(idTokenResult.claims.admin);
				})
			} else {
				setUser(null);
				setAdmin(false);
			}
		});
		return () => unsub();
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, admin }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
