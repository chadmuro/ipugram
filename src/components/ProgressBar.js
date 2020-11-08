import React, { useEffect } from 'react';
import { useStorage } from '../hooks/useStorage';
import { makeStyles } from '@material-ui/core';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
	progressBar: {
		height: '5px',
		background: '#a5d6a7',
		marginTop: '20px',
	},
});

const ProgressBar = ({ file, setFile }) => {
	const classes = useStyles();
	const { url, progress } = useStorage(file);

	useEffect(() => {
		if (url) {
			setFile(null);
		}
	}, [url, setFile]);

	return (
		<motion.div
			className={classes.progressBar}
			initial={{ width: 0 }}
			animate={{ width: progress + '%' }}
		></motion.div>
	);
};

export default ProgressBar;
