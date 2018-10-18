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
			location: "",
			language: "",
			showDate: "",
			showTime: ""
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

	languageChangeHandler = e => {
		this.setState({ language: e.target.value });
	}

	showDateChangeHandler = e => {
		this.setState({ showDate: e.target.value });
	}

	showTimeChangeHandler = e => {
		this.setState({ showTime: e.target.value });
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
							<br /><br />

							<FormControl required className="formControl" >
								<InputLabel htmlFor="language">Choose Language: </InputLabel>
								<Select
									id="language"
									value={this.state.language}
									onChange={this.languageChangeHandler}
								>
									{language.map(lng => (
										<MenuItem key={"language" + lng.id} value={lng.language}>{lng.language}</MenuItem>
									))}
								</Select>
							</FormControl>
							<br /><br />

							<FormControl required className="formControl" >
								<InputLabel htmlFor="showDate">Choose Show Date: </InputLabel>
								<Select
									id="showDate"
									value={this.state.showDate}
									onChange={this.showDateChangeHandler}
								>
									{showDate.map(sd => (
										<MenuItem key={"showDate" + sd.id} value={sd.showDate}>{sd.showDate}</MenuItem>
									))}
								</Select>
							</FormControl>
							<br /><br />

							<FormControl required className="formControl" >
								<InputLabel htmlFor="showTime">Choose Show Time: </InputLabel>
								<Select
									id="showTime"
									value={this.state.showTime}
									onChange={this.showTimeChangeHandler}
								>
									{showTime.map(st => (
										<MenuItem key={"showTime" + st.id} value={st.showTime}>{st.showTime}</MenuItem>
									))}
								</Select>
							</FormControl>
							<br /><br />
						</CardContent>
					</Card>
				</div>
			</>
		)
	}
}

export default withStyles(styles)(BookMovieShow);