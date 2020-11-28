import React, { useState, useEffect, createContext } from 'react';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

const AuthProvider = props => {
	const [user, setUser] = useState({});
	const [userId, setUserId] = useState('');
	const [admin, setAdmin] = useState(false);

	useEffect(() => {
		const unsub = auth.onAuthStateChanged(user => {
			if (user) {
				setUser(user);
				setUserId(user.uid);
				auth.currentUser.getIdTokenResult().then(idTokenResult => {
					setAdmin(idTokenResult.claims.admin);
				})
			} else {
				setUser(null);
				setUserId('');
				setAdmin(false);
			}
		});
		return () => unsub();
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, admin, userId }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
