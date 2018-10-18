import React, { Component } from "react";

import Header from "../../common/Header/Header";

import moviesData from "../../common/movieData";
import "./movie-detials.css";
import { Typography } from "@material-ui/core";

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
	render() {
		const { movie } = this.state;
		return (
			<div className="detials">
				<Header />
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
						<div>
							<Typography>
								<span className="bold">Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}
							</Typography>
						</div>
					</div>
					<div className="rightDetails"></div>
				</div>
			</div>
		)
	}
}

export default MovieDetails;