import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { Typography, withStyles, Card, CardContent, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

import Header from '../../common/Header/Header';
import moviesData from "../../common/movieData";
import language from '../../common/language';
import location from '../../common/location';
import showDate from '../../common/showDate';
import showTime from '../../common/showTime';

import './book-movie-show.css'

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
			movie: {},
			location: {}
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

	locationChangeHandler = e => {
		this.setState({ location: e.target.value });
	}

	render() {
		const { routeData, classes } = this.props;
		return (
			<>
				<Header />
				<div className="bookShow">
					<div className="back">
						<Link id={`BackButton`} to={`/details/${routeData.params.movieId}`} className={classes.backButton}>
							<ChevronLeft />
							<Typography style={{ display: "inline" }} variant="subheading" component="span">Back to Movie Details</Typography>
						</Link>
					</div>
					<Card className="cardStyle">
						<CardContent>
							<Typography variant="headline" component="h2"> BOOK SHOW </Typography><br />

							<FormControl required className="formControl" >
								<InputLabel htmlFor="location">Choose Location: </InputLabel>
								<Select
									id="location"
									value={this.state.location}
									onChange={this.locationChangeHandler}
								>
									{location.map(loc => (
										<MenuItem key={"location" + loc.id} value={loc.location}>{loc.location}</MenuItem>
									))}
								</Select>
							</FormControl>
						</CardContent>
					</Card>
				</div>
			</>
		)
	}
}

export default withStyles(styles)(BookMovieShow);