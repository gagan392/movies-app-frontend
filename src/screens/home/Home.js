import React, { Component } from "react";
import './Home.css';
import { withStyles } from "@material-ui/core/styles";

import Header from '../../common/Header/Header';
import UpcomingMovieGridList from "./upcoming-movie-grid-list/upcoming-movie-grid-list";
import ReleasedMovieGridList from "./released-movie-grid-list/released-movie-grid-list";
import MovieFilters from "./movie-filters/movie-filters";

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	}
});

class Home extends Component {

	constructor() {
		super();
		this.state = {
			movieName: "",
			genres: [],
			artists: [],
			releasedMovies: [],
			upcomingMovies: []
		}
	}

	getReleasedMovies() {
		const { apiClient } = this.props;
		return apiClient.getMovies({
			status: "RELEASED"
		});
	}

	getUpcomingMovies() {
		const { apiClient } = this.props;
		return apiClient.getMovies({
			status: "PUBLISHED"
		});
	}

	async componentWillMount() {
		const [releasedMovies, upcomingMovies] = await Promise.all([
			this.getReleasedMovies(),
			this.getUpcomingMovies()
		]);
		this.setState({
			releasedMovies: releasedMovies.movies,
			upcomingMovies: upcomingMovies.movies
		});
		console.log(" releasedMovies ", releasedMovies);
		console.log(" upcomingMovies ", upcomingMovies);

	}
	movieNameChangeHandler = e => {
		this.setState({
			movieName: e.target.value
		});
	}

	genreChangeHandler = e => {
		this.setState({
			genres: e.target.value
		});
	}

	artistChangeHandler = e => {
		this.setState({
			artists: e.target.value
		});
	}

	render() {

		const movieFiltersProps = {
			genresSelected: this.state.genres,
			artistsSelected: this.state.artists,
			genreChangeHandler: this.genreChangeHandler,
			artistChangeHandler: this.artistChangeHandler,
			movieNameChangeHandler: this.movieNameChangeHandler,
		}

		const { upcomingMovies, releasedMovies } = this.state;
		return (
			<>
				<Header />
				{upcomingMovies.length > 0 && releasedMovies.length > 0 &&
					<>
						<UpcomingMovieGridList upcomingMovies={upcomingMovies} />
						<div className="flex-container">
							<div className="left">
								<ReleasedMovieGridList releasedMovies={releasedMovies} />
							</div>
							<div className="right">
								<MovieFilters {...movieFiltersProps} />
							</div>
						</div>
					</>
				}
			</>
		)
	}
}

export default withStyles(styles)(Home);