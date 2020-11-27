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
import { ReadFirestore, deleteFromFirestore } from '../hooks/useFirestore';
import { deleteFromStorage } from '../hooks/useStorage';
import { AuthContext } from '../contexts/AuthContext';

const useStyles = makeStyles({
	container: {
		marginTop: '3rem',
	},
	gridList: {
		minHeight: '250px',
	},
	gridImage: {
		cursor: 'pointer',
		opacity: '0.8',
		'&:hover': {
			opacity: '1',
			transition: 'opacity .3s',
		},
	},
	titleBar: {
		background: 'none',
		pointerEvents: 'none'
	},
	deleteButton: {
		pointerEvents: 'auto'
	}
});

const ImageGrid = ({ setSelectedImg }) => {
	const { docs } = ReadFirestore('images');
	const classes = useStyles();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
	const { user, admin } = useContext(AuthContext);

	const deleteImage = (doc) => {
		deleteFromFirestore(doc.id);
		deleteFromStorage(doc.name);
	}

	return (
		<Container className={classes.container} maxWidth="md">
			<GridList cols={isMobile ? 2 : 3} spacing={10}>
				{docs.map((doc) => (
					<GridListTile key={doc.id} cols={1} className={classes.gridList}>
						<img
							src={doc.url}
							alt="Ipu"
							className={classes.gridImage}
							onClick={() => setSelectedImg(doc.url)}
						/>
						{admin && (
							<GridListTileBar
								className={classes.titleBar}
								actionIcon={
									<IconButton className={classes.deleteButton} onClick={() => deleteImage(doc)}>
										<DeleteIcon color="error" fontSize="large"/>
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
