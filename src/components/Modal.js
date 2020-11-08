import React from 'react';
import { Modal, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
	modal: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		maxWidth: '60%',
		maxHeight: '80%',
		border: '3px solid white',
		outline: 'none',
	},
});

const ModalDisplay = ({ selectedImg, setSelectedImg }) => {
	const classes = useStyles();

	const handleClick = (e) => {
		if (e.target.localName === 'div') {
			setSelectedImg(null);
		}
	};

	return (
		<Modal open={true} className={classes.modal} onClick={handleClick}>
			<img src={selectedImg} alt="Ipu" className={classes.image} />
		</Modal>
	);
};

export default ModalDisplay;
