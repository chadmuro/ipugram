import { auth } from '../firebase/config';

export const authSignup = (email, password) => {
	auth.createUserWithEmailAndPassword(email, password).then((cred) => {
		console.log(cred.user);
	});
};

export const authLogout = () => {
	auth.signOut();
};

export const authLogin = (email, password) => {
	auth.signInWithEmailAndPassword(email, password).then((cred) => {
		console.log(cred.user);
	});
};


