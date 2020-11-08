import React from 'react';
import { Typography, Toolbar, Container, makeStyles, Button } from '@material-ui/core';
import { authLogout } from '../hooks/useAuth';

const useStyles = makeStyles({
    title: {
        marginTop: '1rem'
    },
    subtitle: {
        marginTop: '2.5rem'
    },
    header: {
        flexGrow: 1
    }
})

const Title = ({ signupOpen, setSignupOpen, loginOpen, setLoginOpen, isLoggedIn }) => {
    const classes = useStyles();

    const logout = (e) => {
        e.preventDefault();
        authLogout();
    }

    return (
			<>
				<Toolbar>
					<Typography color="primary" variant="h5" className={classes.header}>
						IpuGram
					</Typography>

					{isLoggedIn && (
						<Button color="primary" variant="outlined" onClick={logout}>
							Logout
						</Button>
					)}
					{!isLoggedIn && (
						<>
						<Button color="primary" variant="outlined" onClick={() => setLoginOpen(!loginOpen)}>
						Login
						</Button>
						<Button disabled color="primary" variant="outlined" onClick={() => setSignupOpen(!signupOpen)}>
							Sign up
						</Button>
						</>
					)}
				</Toolbar>
				<Container className={classes.title}>
					<Typography color="secondary" variant="h3" align="center">
						Ipu's Pictures
					</Typography>
					<Typography
						color="secondary"
						variant="h6"
						align="center"
						className={classes.subtitle}
					>
						{isLoggedIn ? 'Upload and browse your favorite pictures of Ipu' : 'View your favorite pictures of Ipu!'}
					</Typography>
				</Container>
			</>
		);
}

export default Title;