import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { withStyles, Button, Card, CardContent, Typography, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';

import { ChevronLeft } from "@material-ui/icons";

import Header from '../../common/Header/Header';
import CustomSnackBar from "../../common/SnackBar/SnackBar";
import coupons from "../../common/coupons";
import './confirm-movie-show.css'

const styles = () => ({
	anchorOriginTopCenter: {
		top: '4rem'
	},
	backButton: {
		justifyContent: 'center',
		'& svg': {
			fontSize: '1.5rem'
		}
	},
	applyButton: {
		marginLeft: '2rem'
	}
});

class ConfirmMovieShow extends Component {

	constructor() {
		super();
		this.state = {
			open: false,
			vertical: 'top',
			horizontal: 'center',
			couponCode: ""
		};
	}

	componentWillMount() {
		let currState = this.state;
		const { location } = this.props;
		const summary = location.state;

		currState.originalTotalPrice = summary.unitPrice * summary.tickets.length;
		currState.totalPrice = currState.originalTotalPrice;

		currState.summary = summary;
		this.setState(currState);

	}

	confirmBookingClickHandler = async () => {

		let data = JSON.stringify({
			"customerUuid": sessionStorage.getItem('uuid'),
			"bookingRequest": {
				"coupon_code": this.state.couponCode,
				"show_id": this.state.summary.showId,
				"tickets": [
					this.state.summary.tickets.toString()
				]
			}
		});

		try {
			await this.props.apiClient.bookShow(data);
			this.setState({
				open: true,
				variant: "success",
				message: "Booking Confirmed!",
				bookingConfirmed: true
			});
		} catch (error) {
			this.setState({
				open: true,
				variant: "error",
				message: "Booking Failed. Try again!",
				bookingConfirmed: false
			});
		}
	};

	snackBarCloseHandler = () => {
		this.setState({ open: false });

		if (this.state.bookingConfirmed === true) {
			this.props.history.push({
				pathname: `/bookshow/${this.props.match.params.id}`,
				state: this.state.summary
			});
		}
	};

	couponChangeHandler = e => {
		this.setState({ couponCode: e.target.value });
	}

	couponApplyClickHandler = async () => {
		const currState = this.state;
		try {
			if (this.state.couponCode === "") {
				this.setState({
					open: true,
					variant: "warning",
					message: "Please select a coupon!"
				})
				return;
			}

			const couponObj = await this.props.apiClient.getCouponById(this.state.couponCode);
			if (couponObj) {
				currState.totalPrice = this.state.originalTotalPrice - ((this.state.originalTotalPrice * couponObj.value) / 100);
				currState.open = true;
				currState.variant = "success";
				currState.message = "Coupon applied successfully!";
				this.setState(currState);
			}
		} catch (error) {
			this.setState({
				open: true,
				variant: "error",
				message: "Coupon not valid. Try another!"
			})
		}
	}

	render() {
		const { classes, match } = this.props;
		const { vertical, horizontal, open, variant, message, couponCode, summary: { location, language, showDateTime, tickets, unitPrice }, totalPrice } = this.state;

		return (
			<>
				<Header />
				<div className="back">
					<Link id={`BackButton`} to={{
						pathname: `/bookshow/${match.params.id}`,
						state: this.state.summary
					}} className={classes.backButton}>
						<ChevronLeft />
						<Typography style={{ display: "inline" }} variant="subheading" component="span">Back to Book Show</Typography>
					</Link>
				</div>
				<div className="confirmShow">
					<Card className="cardStyle">
						<CardContent>
							<Typography variant="headline" component="h2">SUMMARY</Typography>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Location:</Typography>
								</div>
								<div>
									<Typography component="span">{location}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Language:</Typography>
								</div>
								<div>
									<Typography component="span">{language}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Show Date & Time:</Typography>
								</div>
								<div>
									<Typography component="span">{showDateTime}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Tickets:</Typography>
								</div>
								<div>
									<Typography component="span">{tickets.length + " ( Seat No: " + tickets.join() + " )"}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Unit Price:</Typography>
								</div>
								<div>
									<Typography component="span">{unitPrice}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<FormControl className="formControl">
									<InputLabel htmlFor="coupon">
										<Typography>Coupon Code</Typography>
									</InputLabel>
									<Select
										id="coupon"
										value={couponCode}
										onChange={this.couponChangeHandler}
									>
										{coupons.map(coupon => (
											<MenuItem key={"coupon" + coupon.id} value={coupon.code}>{coupon.code}</MenuItem>
										))}
									</Select>
								</FormControl>
								<Button variant="contained" color="primary" className={classes.applyButton} onClick={this.couponApplyClickHandler}>
									Apply
								</Button>
							</div>
							<br /><br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Total Price:</Typography>
								</div>
								<div>
									<Typography component="span">{totalPrice}</Typography>
								</div>
							</div>
							<br />

							<Button variant="contained" color="primary" onClick={this.confirmBookingClickHandler}>CONFIRM BOOKING</Button>
						</CardContent>
					</Card>
				</div>
				<CustomSnackBar
					vertical={vertical}
					horizontal={horizontal}
					open={open}
					onClose={this.snackBarCloseHandler}
					classes={{ anchorOriginTopCenter: classes.anchorOriginTopCenter }}
					variant={variant}
					message={message}
				/>
			</>
		);
	}
}

export default withRouter(withStyles(styles)(ConfirmMovieShow));