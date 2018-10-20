import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { GridList, withStyles, GridListTile, GridListTileBar } from "@material-ui/core";

const styles = () => ({
	gridListReleasedMovies: {
		transform: 'translateZ(0)',
		cursor: 'pointer'
	}
});

class ReleasedMovieGridList extends Component {

	render() {
		const { classes, releasedMovies } = this.props;
		return (
			releasedMovies.length > 0 && <GridList cellHeight={350} cols={4} className={classes.gridListReleasedMovies}>
				{releasedMovies.map(releasedMovie =>
					<GridListTile key={releasedMovie.id} className="released-movie-grid-item">
						<Link key={releasedMovie.id} to={`/movie/${releasedMovie.id}`}>
							<img src={releasedMovie.poster_url} className="movie-poster" alt={releasedMovie.title} />
							<GridListTileBar title={releasedMovie.title} />
						</Link>
					</GridListTile>
				)}
			</GridList>
		);
	}
}

export default withStyles(styles)(ReleasedMovieGridList);