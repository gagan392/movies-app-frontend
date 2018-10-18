import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Typography, withStyles, GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import { ChevronLeft } from "@material-ui/icons";
import Youtube from "react-youtube";

import Header from "../../common/Header/Header";

import moviesData from "../../common/movieData";
import "./movie-detials.css";

const styles = theme => ({
	backButton: {
		'& svg': {
			height: '1rem'
		}
	}
});

class MovieDetails extends Component {

	constructor() {
		super();
		this.state = {
			movie: {}
		}
	}

	componentWillMount() {
		const currState = this.state;
		currState.movie = moviesData.find(movie => {
			return movie.id === this.props.routeData.params.movieId
		});

		this.setState({ currState });
	}

	_onReady(event) {
		// access to player in all event handlers via event.target
		// event.target.pauseVideo();
	}

	artistClickHandler = (url) => {
        window.location = url;
    }

	render() {
		const { movie } = this.state;
		const { classes } = this.props;
		const opts = {
			height: '500',
			width: '700',
			playerVars: {
				autoplay: 1
			}
		}

		return (
			<div className="detials">
				<Header />
				<div className="back">
					<Link id={`BackButton`} to="/" className={classes.backButton}>
						<ChevronLeft />
						<Typography style={{ display: "inline" }} variant="subheading" component="span">Back to home</Typography>
					</Link>

				</div>
				<div className="flex-containerDetails">
					<div className="leftDetails">
						<img src={movie.poster_url} alt={movie.title} />
					</div>
					<div className="middleDetails">
						<div>
							<Typography variant="headline" component="h2">{movie.title}</Typography>
						</div>
						<div>
							<Typography><span className="bold">Genres:</span> {movie.genres.join(',')}</Typography>
						</div>
						<div>
							<Typography><span className="bold">Duration:</span> {movie.duration}</Typography>
						</div>
						<div>
							<Typography><span className="bold">Release Date:</span> {new Date(movie.release_date).toDateString()}</Typography>
						</div>
						<div>
							<Typography><span className="bold">Rating:</span> {movie.critics_rating}</Typography>
						</div>
						<br />
						<div className="marginTop16">
							<Typography>
								<span className="bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}
							</Typography>
						</div>
						<div className="trailerContainer">
							<Typography><span className="bold">Trailer: </span></Typography>
							<Youtube
								videoId={movie.trailer_url.split('?v=')[1]}
								opts={opts}
								onReady={this._onReady}
							/>
						</div>
					</div>
					<div className="rightDetails">
						<Typography><span className="bold">Artists: </span>
							<GridList cellHeight={350} cols={2}>
								{movie.artists != null && movie.artists.map(artist =>
										<GridListTile key={artist.id} onClick={() => this.artistClickHandler(artist.wiki_url)}>
											<img src={artist.profile_url} alt={artist.title} />
											<GridListTileBar title={artist.first_name + artist.last_name} />
										</GridListTile>
								)}
							</GridList></Typography>
					</div>
				</div>
			</div>
		)
	}
}

export default withStyles(styles)(MovieDetails);