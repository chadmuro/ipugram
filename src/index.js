import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import App from './App';
import AuthProvider from './contexts/AuthContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#a5d6a7'
    },
    secondary: {
      main: '#616161'
    }
  },
  typography: {
    fontFamily: 'Noto Serif'
  }
})

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ThemeProvider>,
	document.getElementById('root')
);
