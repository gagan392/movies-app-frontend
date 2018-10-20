import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { Typography, withStyles, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Input, Button, FormHelperText } from '@material-ui/core';

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
			showTime: "",
			tickets: 0,
			availableTickets: 20,
			unitPrice: 500,
			locationRequired: "dispNone",
			languageRequired: "dispNone",
			showDateRequired: "dispNone",
			showTimeRequired: "dispNone",
			ticketsRequired: "dispNone"
		}
	}

	componentWillMount() {
		let currState = this.state;
		const { routeData } = this.props;
		currState.movie = moviesData.find(movie => {
			return movie.id === routeData.match.params.movieId
		});
		if (routeData.location.state) {
			const summary = routeData.location.state;
			currState = summary;
		}

		this.setState(currState);
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

	ticketsChangeHandler = e => {
		this.setState({ tickets: e.target.value });
	}

	bookShowButtonHandler = () => {
		const currState = this.state;
		currState.locationRequired = currState.location === "" ? "dispBlock" : "dispNone";
		currState.languageRequired = currState.language === "" ? "dispBlock" : "dispNone";
		currState.showDateRequired = currState.showDate === "" ? "dispBlock" : "dispNone";
		currState.showTimeRequired = currState.showTime === "" ? "dispBlock" : "dispNone";
		currState.ticketsRequired = currState.tickets <= 0 ? "dispBlock" : "dispNone";

		this.setState(currState);
		const navigateToBookingConfiramtionPage = (currState.locationRequired === "dispNone" && currState.languageRequired === "dispNone" && currState.showDateRequired === "dispNone" && currState.showTimeRequired === "dispNone" && currState.ticketsRequired === "dispNone");

		if (navigateToBookingConfiramtionPage) {
			this.props.history.push({
				pathname: `/confirm/${this.state.movie.id}`,
				state: this.state
			});
		}
	}

	render() {
		const { routeData, classes } = this.props;
		return (
			<>
				<Header />
				<div className="bookShow">
					<div className="back">
						<Link id={`BackButton`} to={`/details/${routeData.match.params.movieId}`} className={classes.backButton}>
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
								<FormHelperText className={this.state.locationRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
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
								<FormHelperText className={this.state.languageRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
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
								<FormHelperText className={this.state.showDateRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
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
								<FormHelperText className={this.state.showTimeRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
							</FormControl>
							<br /><br />

							<FormControl className="formControl">
								<InputLabel htmlFor="tickets"> Tickets: ({this.state.availableTickets} available)</InputLabel>
								<Input id="tickets" value={this.state.tickets !== 0 ? this.state.tickets : ""} type="number" onChange={this.ticketsChangeHandler} />
								<FormHelperText className={this.state.ticketsRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
							</FormControl>
							<br /><br />

							<Typography>Unit Price: Rs. {this.state.unitPrice}</Typography>
							<Typography>Total Price: Rs. {this.state.unitPrice * this.state.tickets}</Typography>
							<br /><br />

							<Button variant="contained" color="primary" onClick={this.bookShowButtonHandler}>BOOK SHOW</Button>
						</CardContent>
					</Card>
				</div>
			</>
		)
	}
}

export default withRouter(withStyles(styles)(BookMovieShow));