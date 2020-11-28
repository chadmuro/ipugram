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
import FavoriteIcon from '@material-ui/icons/Favorite';
import { deleteFromFirestore } from '../hooks/useFirestore';
import { deleteFromStorage } from '../hooks/useStorage';
import { AuthContext } from '../contexts/AuthContext';
import { ImagesContext } from '../contexts/ImagesContext';
import {
	GetLikedImages,
	AddLikedImages,
	RemoveLikedImages,
} from '../hooks/useLikedPhotos';

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
		background:
			'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	favoriteButton: {
		color: '#fff',
	},
	favoriteButtonLiked: {
		color: '#f00',
	},
});

const ImageGrid = ({ setSelectedImg }) => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { user, admin, userId } = useContext(AuthContext);
	const { images } = useContext(ImagesContext);
	const { likedImages } = GetLikedImages(userId);

	// const deleteImage = doc => {
	// 	deleteFromFirestore(doc.id);
	// deleteFromStorage(doc.name);
	// };

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
						{user ? (
							likedImages && likedImages.includes(image.id) ? (
								<GridListTileBar
									titlePosition="top"
									className={classes.titleBar}
									actionIcon={
										<IconButton
											className={classes.favoriteButtonLiked}
											onClick={() => RemoveLikedImages(user.uid, image.id)}
										>
											<FavoriteIcon fontSize="large" fontSize="inherit" />
										</IconButton>
									}
									actionPosition="left"
								/>
							) : (
								<GridListTileBar
									titlePosition="top"
									className={classes.titleBar}
									actionIcon={
										<IconButton
											className={classes.favoriteButton}
											onClick={() => AddLikedImages(user.uid, image.id)}
										>
											<FavoriteIcon fontSize="large" fontSize="inherit" />
										</IconButton>
									}
									actionPosition="left"
								/>
							)
						) : (
							''
						)}
					</GridListTile>
				))}
			</GridList>
		</Container>
	);
};

export default ImageGrid;
