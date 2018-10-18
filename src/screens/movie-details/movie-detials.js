import React, { Component } from "react";

import Header from "../../common/Header/Header";

import moviesData from "../../common/movieData";
import "./movie-detials.css";

class MovieDetails extends Component {

	constructor() {
		super();
		this.state = {
			movie: {}
		}
	}

	componentDidMount() {
		const currState = this.state;
		currState.movie = moviesData.find(movie => {
			return movie.id === this.props.routeData.params.movieId
		});

		this.setState({currState});
		console.log(this.state.movie);
	}
	render() {
		return (
			<div className="detials">
				<Header />
				<div className="flex-containerDetails">
					<div className="leftDetails"></div>
					<div className="middleDetails"></div>
					<div className="rightDetails"></div>
				</div>
			</div>
		)
	}
}

export default MovieDetails;