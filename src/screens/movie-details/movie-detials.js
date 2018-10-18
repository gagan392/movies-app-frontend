import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { Typography, withStyles, GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import StarBorderIcon from "@material-ui/icons/StarBorder";
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
			movie: {},
			starIcons: [
				{
					id: 1,
					stateId: "star1",
					color: "black"
				},
				{
					id: 2,
					stateId: "star2",
					color: "black"
				},
				{
					id: 3,
					stateId: "star3",
					color: "black"
				},
				{
					id: 4,
					stateId: "star4",
					color: "black"
				},
				{
					id: 5,
					stateId: "star5",
					color: "black"
				}
			]
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

	starClickHandler = starId => {
		const starIconsList = [];
		this.state.starIcons.forEach(star => {
			let starNode = star;
			if (star.id <= starId) {
				starNode.color = "yellow";
			} else {
				starNode.color = "black";
			}
			starIconsList.push(starNode);
		});

		this.setState({
			starIcons: starIconsList
		});
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
						<Typography><span className="bold">Rate this movie: </span></Typography>
						{this.state.starIcons.map(star => (
							<StarBorderIcon key={`star${star.id}`} className={star.color} onClick={() => this.starClickHandler(star.id)} />
						))}
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