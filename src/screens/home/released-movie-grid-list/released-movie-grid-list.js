import React, { Component } from "react";
import { GridList, withStyles, GridListTile, GridListTileBar } from "@material-ui/core";

import moviesData from "../../../common/movieData";

const styles = () => ({
	gridListReleasedMovies: {
		transform: 'translateZ(0)',
		cursor: 'pointer'
	}
});

class ReleasedMovieGridList extends Component {
	render() {
		const { classes } = this.props;
		return (
			<GridList cellHeight={350} cols={4} className={classes.gridListReleasedMovies}>
				{moviesData.map(movieData =>
					<GridListTile key={movieData.id} className="released-movie-grid-item">
						<img src={movieData.poster_url} className="movie-poster" alt={movieData.title} />
						<GridListTileBar title={movieData.title} />
					</GridListTile>
				)}
			</GridList>
		);
	}
}

export default withStyles(styles)(ReleasedMovieGridList);