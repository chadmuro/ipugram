import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import App from './App';
import AuthProvider from './contexts/AuthContext';
import ImagesProvider from './contexts/ImagesContext';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#a5d6a7',
		},
		secondary: {
			main: '#616161',
		},
	},
	typography: {
		fontFamily: 'Noto Serif',
	},
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<AuthProvider>
			<ImagesProvider>
					<App />
			</ImagesProvider>
		</AuthProvider>
	</ThemeProvider>,
	document.getElementById('root')
);
