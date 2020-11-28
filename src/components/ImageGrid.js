import React, { useContext } from 'react';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	makeStyles,
	Container,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteFromFirestore } from '../hooks/useFirestore';
import { deleteFromStorage } from '../hooks/useStorage';
import { AuthContext } from '../contexts/AuthContext';
import { ImagesContext } from '../contexts/ImagesContext';

const useStyles = makeStyles({
	container: {
		marginTop: '3rem',
	},
	gridListTile: {
		minHeight: '250px',
		opacity: '0.8',
		transition: 'opacity .3s',
		'&:hover': {
			opacity: '1',
		},
		cursor: 'pointer',
	},
	titleBar: {
		background: 'none',
		pointerEvents: 'none',
	},
	deleteButton: {
		pointerEvents: 'auto',
	},
});

const ImageGrid = ({ setSelectedImg }) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { user, admin } = useContext(AuthContext);
	const { images } = useContext(ImagesContext);

	const deleteImage = doc => {
		deleteFromFirestore(doc.id);
		deleteFromStorage(doc.name);
	};

	return (
		<Container className={classes.container} maxWidth="md">
			<GridList cols={isMobile ? 2 : 3} spacing={10}>
				{images.map(image => (
					<GridListTile
						key={image.id}
						cols={1}
						className={classes.gridListTile}
					>
						<img
							src={image.url}
							alt="Ipu"
							onClick={() => setSelectedImg(image.url)}
						/>
						{admin && (
							<GridListTileBar
								className={classes.titleBar}
								actionIcon={
									<IconButton
										className={classes.deleteButton}
										onClick={() => deleteImage(image)}
									>
										<DeleteIcon color="error" fontSize="large" />
									</IconButton>
								}
							/>
						)}
					</GridListTile>
				))}
			</GridList>
		</Container>
	);
};

export default ImageGrid;
