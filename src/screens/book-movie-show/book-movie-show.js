import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { Typography, withStyles, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Input, Button, FormHelperText } from '@material-ui/core';

import Header from '../../common/Header/Header';
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
			showId: "",
			originalShows: [],
			location: "",
			locationList: [],
			theatre: "",
			theatreList: [],
			language: "",
			languageList: [],
			showDateTime: "",
			showDateTimeList: [],
			tickets: [],
			availableTickets: 0,
			unitPrice: 0,
			locationRequired: "dispNone",
			theatreRequired: "dispNone",
			languageRequired: "dispNone",
			showDateTimeRequired: "dispNone",
			ticketsRequired: "dispNone"
		}
	}

	async componentWillMount() {
		let currState = this.state;
		const { match, location, apiClient } = this.props;
		const showsData = await apiClient.getMovieShowsById(match.params.id);
		currState.originalShows = showsData.shows;

		let locationList = [];
		showsData.shows.forEach(show => locationList.push({ id: show.theatre.city, location: show.theatre.city }));

		locationList = locationList.filter((loc, index, selfArr) => (
			index === selfArr.findIndex(l => (
				l.id === loc.id
			)))
		);

		currState.locationList = locationList;

		if (location.state) {
			currState = location.state;
		}
		this.setState(currState);
	}

	locationChangeHandler = e => {

		const currState = this.state;
		let theatreList = [];
		this.state.originalShows.forEach(show => {
			if (show.theatre.city === e.target.value) {
				theatreList.push({ id: show.theatre.name, theatre: show.theatre.name })
			}
		});

		theatreList = theatreList.filter((theatre, index, self) => (
			index === self.findIndex(t => (
				theatre.id === t.id
			))
		));

		currState.theatreList = theatreList;
		currState.location = e.target.value;

		this.setState(currState);
	}

	theatreChangeHandler = e => {
		const currState = this.state;
		let languageList = [];
		this.state.originalShows.forEach(show => {
			if (show.theatre.city === currState.location && show.theatre.name === e.target.value) {
				languageList.push({ id: show.language, language: show.language })
			}
		});

		languageList = languageList.filter((lang, index, self) => (
			index === self.findIndex(lng => (
				lang.id === lng.id
			))
		));

		currState.languageList = languageList;
		currState.theatre = e.target.value;

		this.setState(currState);
	}

	languageChangeHandler = e => {
		const currState = this.state;
		let showDateTimeList = [];
		this.state.originalShows.forEach(show => {
			if (show.theatre.city === currState.location && show.theatre.name === currState.theatre && show.language === e.target.value) {
				showDateTimeList.push({ id: show.show_timing, showDateTime: show.show_timing })
			}
		});

		showDateTimeList = showDateTimeList.filter((dateTime, index, self) => (
			index === self.findIndex(dt => (
				dateTime.id === dt.id
			))
		));

		currState.showDateTimeList = showDateTimeList;
		currState.language = e.target.value;

		this.setState(currState);
	}

	showDateTimeChangeHandler = e => {
		const currState = this.state;

		this.state.originalShows.forEach(show => {
			if (show.theatre.city === currState.location && show.theatre.name === currState.theatre
				&& show.language === currState.language && show.show_timing === e.target.value) {
				currState.showId = show.id;
				currState.availableTickets = show.available_seats;
				currState.unitPrice = show.unit_price;
			}
		});

		currState.showDateTime = e.target.value;

		this.setState(currState);
	}

	ticketsChangeHandler = e => {
		this.setState({ tickets: e.target.value.split(",") });
		console.log(this.state.tickets);
	}

	bookShowButtonHandler = () => {
		const currState = this.state;
		currState.locationRequired = currState.location === "" ? "dispBlock" : "dispNone";
		currState.theatreRequired = currState.theatre === "" ? "dispBlock" : "dispNone";
		currState.languageRequired = currState.language === "" ? "dispBlock" : "dispNone";
		currState.showDateTimeRequired = currState.showDate === "" ? "dispBlock" : "dispNone";
		currState.ticketsRequired = currState.tickets <= 0 ? "dispBlock" : "dispNone";

		this.setState(currState);
		const navigateToBookingConfiramtionPage = (currState.locationRequired === "dispNone" && currState.theatreRequired === "dispNone" && currState.languageRequired === "dispNone" && currState.showDateTimeRequired === "dispNone" && currState.ticketsRequired === "dispNone");

		if (navigateToBookingConfiramtionPage) {
			console.log(" bookShowButtonHandler state ", this.state);
			this.props.history.push({
				pathname: `/confirm/${this.props.match.params.id}`,
				state: this.state
			});
		}
	}

	render() {
		const { match, classes } = this.props;
		const { location, theatre, language, showDateTime, locationList, theatreList, languageList, showDateTimeList, tickets, locationRequired, theatreRequired, languageRequired, showDateTimeRequired, ticketsRequired, unitPrice, availableTickets } = this.state;

		return (
			<>
				<Header />
				<div className="bookShow">
					<div className="back">
						<Link id={`BackButton`} to={`/movie/${match.params.id}`} className={classes.backButton}>
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
									value={location}
									onChange={this.locationChangeHandler}
								>
									{locationList.map(loc => (
										<MenuItem key={"location" + loc.id} value={loc.location}>{loc.location}</MenuItem>
									))}
								</Select>
								<FormHelperText className={locationRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
							</FormControl>
							<br /><br />

							<FormControl required className="formControl" >
								<InputLabel htmlFor="theatre">Choose Theatre: </InputLabel>
								<Select
									id="theatre"
									value={theatre}
									onChange={this.theatreChangeHandler}
								>
									{theatreList.map(theatre => (
										<MenuItem key={"theatre" + theatre.id} value={theatre.theatre}>{theatre.theatre}</MenuItem>
									))}
								</Select>
								<FormHelperText className={theatreRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
							</FormControl>
							<br /><br />

							<FormControl required className="formControl" >
								<InputLabel htmlFor="language">Choose Language: </InputLabel>
								<Select
									id="language"
									value={language}
									onChange={this.languageChangeHandler}
								>
									{languageList.map(lng => (
										<MenuItem key={"language" + lng.id} value={lng.language}>{lng.language}</MenuItem>
									))}
								</Select>
								<FormHelperText className={languageRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
							</FormControl>
							<br /><br />

							<FormControl required className="formControl" >
								<InputLabel htmlFor="showDateTime">Choose Show Date & Time: </InputLabel>
								<Select
									id="showDateTime"
									value={showDateTime}
									onChange={this.showDateTimeChangeHandler}
								>
									{showDateTimeList.map(sd => (
										<MenuItem key={"showDate" + sd.id} value={sd.showDateTime}>{sd.showDateTime}</MenuItem>
									))}
								</Select>
								<FormHelperText className={showDateTimeRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
							</FormControl>
							<br /><br />

							<FormControl className="formControl">
								<InputLabel htmlFor="tickets"> Tickets: ({availableTickets} available)</InputLabel>
								<Input id="tickets" value={tickets !== 0 ? tickets : ""} type="string" onChange={this.ticketsChangeHandler} />
								<FormHelperText className={ticketsRequired}>
									<span className="textColorRed">required</span>
								</FormHelperText>
							</FormControl>
							<br /><br />

							<Typography>Unit Price: Rs. {unitPrice}</Typography>
							<Typography>Total Price: Rs. {unitPrice * tickets.length}</Typography>
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