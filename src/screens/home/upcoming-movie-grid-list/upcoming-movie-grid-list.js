import React, { Component } from "react";
import { GridList, withStyles, GridListTile, GridListTileBar } from "@material-ui/core";

import moviesData from "../../../common/movieData";

const styles = () => ({
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
		const { classes } = this.props;
		return (
			<>
				<div className={classes.upcomingMoviesHeading}>
					<span>Upcoming Movies</span>
				</div>
				<GridList cols={5} className={classes.gridListUpcomingMovies}>
					{moviesData.map(movieData =>
						<GridListTile key={movieData.id} className={classes.upcomingMoive}>
							<img src={movieData.poster_url} alt={movieData.title} />
							<GridListTileBar title={movieData.title} />
						</GridListTile>
					)}
				</GridList>
			</>
		);
	}
}

export default withStyles(styles)(UpcomingMovieGridList);