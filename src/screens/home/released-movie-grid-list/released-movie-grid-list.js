import React, { Component } from "react";
import { GridList, withStyles, GridListTile, GridListTileBar } from "@material-ui/core";
import { Link } from "react-router-dom";
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
					<Link key={movieData.id} to={`/details/${movieData.id}`}>
						<GridListTile key={movieData.id} className="released-movie-grid-item">
							<img src={movieData.poster_url} className="movie-poster" alt={movieData.title} />
							<GridListTileBar title={movieData.title} />
						</GridListTile>
					</Link>
				)}
			</GridList>
		);
	}
}

export default withStyles(styles)(ReleasedMovieGridList);