import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './screens/home/Home';
import MovieDetails from './screens/movie-details/movie-detials';
import BookMovieShow from './screens/book-movie-show/book-movie-show';
import ConfirmMovieShow from './screens/confirm-movie-show/confirm-movie-show';

import moviesData from './common/movieData';
import ApiClient from "./client/ApiClient";

const apiClient = new ApiClient();

class Routes extends Component {
	render() {
		return (
			<Router>
				<div className="main-container">
					<Route exact path='/' render={(props) => <Home {...props} apiClient={apiClient} moviesData={moviesData} />} />
					<Route path='/movie/:id' render={(props) => <MovieDetails {...props} />} />
					<Route path='/bookshow/:id' render={(props) => <BookMovieShow {...props} />} />
					<Route path='/confirm/:id' render={(props) => <ConfirmMovieShow {...props} />} />
				</div>
			</Router>
		)
	}
}
export default Routes;