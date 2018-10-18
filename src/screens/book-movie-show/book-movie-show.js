import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { Typography, withStyles } from '@material-ui/core';

import Header from '../../common/Header/Header';
import moviesData from "../../common/movieData";

const styles = theme => ({
	backButton: {
		justifyContent: 'center',
		'& svg': {
			fontSize: '1.5rem'
		}
	}
});

class BookMovieShow extends Component {

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
		console.log(" current movie ", this.state);

	}

	render() {
		const { routeData, classes } = this.props;
		return (
			<>
				<Header />
				<div className="back">
					<Link id={`BackButton`} to={`/details/${routeData.params.movieId}`} className={classes.backButton}>
						<ChevronLeft />
						<Typography style={{ display: "inline" }} variant="subheading" component="span">Back to Movie Details</Typography>
					</Link>
				</div>
			</>
		)
	}
}

export default withStyles(styles)(BookMovieShow);