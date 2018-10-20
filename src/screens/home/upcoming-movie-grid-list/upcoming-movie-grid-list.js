import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { GridList, withStyles, GridListTile, GridListTileBar } from "@material-ui/core";

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.paper,
	},
	upcomingMoviesHeading: {
		textAlign: 'center',
		background: '#ff9999',
		padding: '8px',
		fontSize: '1rem'
	},
	gridListUpcomingMovies: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)',
		width: '100%'
	},
	upcomingMoive: {
		height: 'auto !important',
		'& img': {
			height: '15rem'
		}
	}
});

class UpcomingMovieGridList extends Component {
	render() {
		const { classes, upcomingMovies } = this.props;
		return (
			<>
				<div className={classes.upcomingMoviesHeading}>
					<span>Upcoming Movies</span>
				</div>
				<div className={classes.root}>
					{upcomingMovies && <GridList cols={5} className={classes.gridListUpcomingMovies}>
						{upcomingMovies.map(upcomingMovie =>
						<Link key={upcomingMovie.id} to={`/movie/${upcomingMovie.id}`}>
							<GridListTile key={upcomingMovie.id} className={classes.upcomingMoive}>
								<img src={upcomingMovie.poster_url} alt={upcomingMovie.title} />
								<GridListTileBar title={upcomingMovie.title} />
							</GridListTile>
						</Link>
						)}
					</GridList>}
				</div>
			</>
		);
	}
}

export default withStyles(styles)(UpcomingMovieGridList);