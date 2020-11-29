import React, { useContext } from 'react';
import {
	Modal,
	IconButton,
	makeStyles,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import { ImagesContext } from '../contexts/ImagesContext';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles({
	modal: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageContainer: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		maxWidth: '60%',
		maxHeight: '80%',
		border: '3px solid white',
		outline: 'none',
		overflow: 'hidden',
	},
	imageContainerMobile: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		maxWidth: '90%',
		maxHeight: '80%',
		border: '3px solid white',
		outline: 'none',
		overflow: 'hidden',
	},
	image: {
		maxWidth: '100%',
		minHeight: '100%',
	},
	navBeforeIcon: {
		position: 'absolute',
		color: '#fff',
		zIndex: 10,
		left: 0,
	},
	navNextIcon: {
		position: 'absolute',
		color: '#fff',
		zIndex: 10,
		right: 0,
	},
});

const ModalDisplay = ({ selectedImg, setSelectedImg }) => {
	const classes = useStyles();
	const { images } = useContext(ImagesContext);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

	const handleClose = e => {
		if (e.target.localName === 'div') {
			setSelectedImg(null);
		}
	};

	const handleBeforeClick = index => {
		if (index === 0) {
			setSelectedImg({
				url: images[images.length - 1].url,
				index: images.length - 1,
			});

		} else {
			setSelectedImg({
				url: images[index - 1].url,
				index: index - 1,
			});
		}
	};

	const handleNextClick = (index) => {
		if (index === images.length - 1) {
			setSelectedImg({
				url: images[0].url,
				index: 0
			})
		} else {
			setSelectedImg({
				url: images[index + 1].url,
				index: index + 1
			})
		}
	};

	return (
		<Modal open={true} className={classes.modal} onClick={handleClose}>
			<div
				className={
					isMobile ? classes.imageContainerMobile : classes.imageContainer
				}
			>
				<IconButton
					className={classes.navBeforeIcon}
					onClick={() => handleBeforeClick(selectedImg.index)}
				>
					<NavigateBeforeIcon />
				</IconButton>
				<img src={selectedImg.url} alt="Ipu" className={classes.image} />
				<IconButton
					className={classes.navNextIcon}
					onClick={() => handleNextClick(selectedImg.index)}
				>
					<NavigateNextIcon />
				</IconButton>
			</div>
		</Modal>
	);
};

export default ModalDisplay;
