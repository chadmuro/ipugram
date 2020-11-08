import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import Title from './components/Title';
import UploadForm from './components/UploadForm';
import ImageGrid from './components/ImageGrid';
import ModalDisplay from './components/Modal';
import Signup from './components/Signup';
import Login from './components/Login';
import { auth } from './firebase/config';

const App = () => {
	const [selectedImg, setSelectedImg] = useState(null);
	const [signupOpen, setSignupOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	auth.onAuthStateChanged((user) => {
		if (user) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	});

	return (
		<Container maxWidth="lg">
			<Title signupOpen={signupOpen} setSignupOpen={setSignupOpen} loginOpen={loginOpen} setLoginOpen={setLoginOpen} isLoggedIn={isLoggedIn}/>
			<UploadForm isLoggedIn={isLoggedIn} />
			<ImageGrid setSelectedImg={setSelectedImg} isLoggedIn={isLoggedIn}/>

			{selectedImg && (
				<ModalDisplay
					selectedImg={selectedImg}
					setSelectedImg={setSelectedImg}
				/>
			)}
			<Signup modalOpen={signupOpen} setModalOpen={setSignupOpen} />
			<Login modalOpen={loginOpen} setModalOpen={setLoginOpen} />
		</Container>
	);
};

export default App;
