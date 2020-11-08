import React, { useState } from 'react';
import { Modal, Button, TextField, Grid, Typography, Container, makeStyles } from '@material-ui/core';
import { authSignup } from '../hooks/useAuth';

const useStyles = makeStyles({
	main: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		backgroundColor: 'white',
		padding: '2rem',
		textAlign: 'center',
		outline: 'none',
	},
	form: {
		paddingTop: '1.5rem',
	},
	button: {
		marginTop: '1rem',
	},
});

const Signup = ({ modalOpen, setModalOpen }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const classes = useStyles();

    const handleClick = (e) => {
        if (e.target.classList.length === 0) {
            setModalOpen(!modalOpen);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        authSignup(email, password);
        setModalOpen(!modalOpen);
        setEmail('');
        setPassword('');
    }

    return (
			<Modal
				open={modalOpen}
				className={classes.main}
				onClick={handleClick}
			>
				<Container maxWidth="xs" className={classes.container}>

							<Typography variant="h5">Sign up</Typography>
							<form noValidate className={classes.form} onSubmit={onSubmit}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											label="Email Address"
											name="email"
											autoComplete="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											required
											fullWidth
											name="password"
											label="Password"
											type="password"
											autoComplete="current-password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
									</Grid>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										className={classes.button}
									>
										Sign Up
									</Button>
								</Grid>
							</form>

				</Container>
			</Modal>
		);
}

export default Signup;