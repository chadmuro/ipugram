import React, { useState, useContext } from 'react';
import {
	Dialog,
	DialogTitle,
	List,
	ListItemAvatar,
	Avatar,
	ListItemText,
	makeStyles,
	ListItem,
	TextField,
	Button,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { AuthContext } from '../contexts/AuthContext';
import { functions } from '../firebase/config';

const useStyles = makeStyles({
	form: {
		display: 'flex',
	},
	formButton: {
		alignSelf: 'flex-end',
		marginLeft: '1rem',
	},
});

const ProfileDialog = ({ profileOpen, setProfileOpen }) => {
	const { user, admin } = useContext(AuthContext);
	const [adminEmail, setAdminEmail] = useState('');
	const classes = useStyles();

	const handleClose = () => {
		setProfileOpen(!profileOpen);
	};

	const addAdmin = e => {
		e.preventDefault();
		const addAdminRole = functions.httpsCallable('addAdminRole');
		addAdminRole({ email: adminEmail }).then(result => {
			console.log(result);
			setAdminEmail('');
			setProfileOpen(!setProfileOpen);
		});
	};

	return (
		<Dialog open={profileOpen} onClose={handleClose}>
			<DialogTitle>Profile Details</DialogTitle>
			<List>
				<ListItem>
					<ListItemAvatar>
						<Avatar>
							<PersonIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={user.email} />
				</ListItem>
				{admin && (
					<>
						<ListItem>
							<ListItemText primary="Admin" />
						</ListItem>
						<ListItem>
							<form onSubmit={addAdmin} className={classes.form}>
								<TextField
									label="Email"
									value={adminEmail}
									onChange={e => setAdminEmail(e.target.value)}
								/>
								<Button
									type="submit"
									size="small"
									variant="contained"
									color="primary"
									className={classes.formButton}
								>
									Make Admin
								</Button>
							</form>
						</ListItem>
					</>
				)}
			</List>
		</Dialog>
	);
};

export default ProfileDialog;
