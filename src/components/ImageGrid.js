import React, { useState, useContext } from 'react';
import {
	GridList,
	GridListTile,
	GridListTileBar,
	IconButton,
	makeStyles,
	Container,
	useMediaQuery,
	useTheme,
	Button,
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

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: '2.5rem',
		display: 'flex',
		flexDirection: 'column',
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
	deleteBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	favoriteButton: {
		color: '#fff',
	},
	favoriteButtonLiked: {
		color: '#f00',
	},
	deleteButton: {
		color: theme.palette.primary.dark,
	},
	editButton: {
		marginBottom: '1rem',
		alignSelf: 'center',
	},
}));

const ImageGrid = ({ setSelectedImg }) => {
	const classes = useStyles();
	const theme = useTheme();
	const [editImages, setEditImages] = useState(false);
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { user, admin, userId } = useContext(AuthContext);
	const { images } = useContext(ImagesContext);
	const { likedImages } = GetLikedImages(userId);

	const deleteImage = doc => {
		deleteFromFirestore(doc.id);
		deleteFromStorage(doc.name);
	};

	const handleImageClick = (url, index) => {
		setSelectedImg({
			url,
			index
		})
	}

	return (
		<Container className={classes.container} maxWidth="md">
			{admin && (
				<Button
					variant="contained"
					color="secondary"
					className={classes.editButton}
					onClick={() => {
						setEditImages(!editImages);
					}}
				>
					{editImages ? 'Exit Editor' : 'Edit Images'}
				</Button>
			)}

			<GridList cols={isMobile ? 2 : 3} spacing={10}>
				{images.map((image, index) => (
					<GridListTile
						key={image.id}
						cols={1}
						className={classes.gridListTile}
					>
						<img
							src={image.url}
							alt={image.name}
							onClick={() => handleImageClick(image.url, index)}
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
											<FavoriteIcon />
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
											<FavoriteIcon />
										</IconButton>
									}
									actionPosition="left"
								/>
							)
						) : (
							''
						)}
						{admin
							? editImages && (
									<GridListTileBar
										className={classes.deleteBar}
										actionIcon={
											<IconButton
												className={classes.deleteButton}
												onClick={() => deleteImage(image)}
											>
												<DeleteIcon />
											</IconButton>
										}
									/>
							  )
							: ''}
					</GridListTile>
				))}
			</GridList>
		</Container>
	);
};

export default ImageGrid;
