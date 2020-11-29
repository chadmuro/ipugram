import React, { useState, useContext } from 'react';
import {
	Typography,
	Toolbar,
	Container,
	makeStyles,
	Button,
} from '@material-ui/core';
import { authLogout } from '../hooks/useAuth';
import { AuthContext } from '../contexts/AuthContext';
import ProfileDialog from './ProfileDialog';

const useStyles = makeStyles({
	title: {
		marginTop: '1rem',
	},
	subtitle: {
		marginTop: '2.5rem',
	},
	header: {
		flexGrow: 1,
	},
});

const Title = ({ signupOpen, setSignupOpen, loginOpen, setLoginOpen }) => {
	const { user } = useContext(AuthContext);
	const [profileOpen, setProfileOpen] = useState(false);
	const classes = useStyles();

	const logout = () => {
		authLogout();
	};

	const showProfile = () => {
		setProfileOpen(!profileOpen);
	}

	return (
		<>
			<Toolbar>
				<Typography color="primary" variant="h5" className={classes.header}>
					IpuGram
				</Typography>

				{user && (
					<>
						<Button color="primary" variant="outlined" onClick={showProfile}>
							Profile
						</Button>
						<ProfileDialog profileOpen={profileOpen} setProfileOpen={setProfileOpen} />
						<Button color="primary" variant="outlined" onClick={logout}>
							Logout
						</Button>
					</>
				)}
				{!user && (
					<>
						<Button
							color="primary"
							variant="outlined"
							onClick={() => setLoginOpen(!loginOpen)}
						>
							Login
						</Button>
						<Button
							color="primary"
							variant="outlined"
							onClick={() => setSignupOpen(!signupOpen)}
						>
							Sign up
						</Button>
					</>
				)}
			</Toolbar>
			<Container className={classes.title}>
				<Typography color="secondary" variant="h3" align="center">
					IpuGram
				</Typography>
				<Typography
					color="secondary"
					variant="h6"
					align="center"
					className={classes.subtitle}
				>
					{user
						? 'Browse and like your favorite photos of Ipu. Most liked photos will be featured at the top.'
						: 'Login or sign up to like your favorite photos!'}
				</Typography>
			</Container>
		</>
	);
};

export default Title;
