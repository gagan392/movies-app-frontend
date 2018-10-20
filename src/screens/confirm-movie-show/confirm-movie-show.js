import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import { withStyles, Button, Snackbar, SnackbarContent, IconButton, Card, CardContent, Typography, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import { green } from "@material-ui/core/colors";

import { Close as CloseIcon, CheckCircle as CheckCircleIcon, ChevronLeft } from "@material-ui/icons";

import Header from '../../common/Header/Header';
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
		const currState = this.state;
		const { location } = this.props;

		const summary = location.state;
		currState.originalTotalPrice = summary.unitPrice * summary.tickets;
		currState.totalPrice = currState.originalTotalPrice;

		currState.summary = summary;
		this.setState(currState);

	}

	handleClick = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
		this.props.history.push({
			pathname: `/bookshow/${this.state.summary.movie.id}`,
			state: this.state.summary
		});
	};

	couponChangeHandler = e => {
		this.setState({ couponCode: e.target.value });
	}

	couponApplyClickHandler = () => {
		const currState = this.state;
		const couponObj = coupons.find(coupon => coupon.code === this.state.couponCode);

		if (couponObj) {
			currState.totalPrice = this.state.originalTotalPrice - ((this.state.originalTotalPrice * couponObj.value) / 100);
			this.setState(currState);
		}
	}

	render() {
		const { classes } = this.props;
		const { vertical, horizontal, open, summary } = this.state;
		return (
			<>
				<Header />
				<div className="back">
					<Link id={`BackButton`} to={{
						pathname: `/bookshow/${summary.movie.id}`,
						state: summary
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
									<Typography component="span">{summary.location}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Language:</Typography>
								</div>
								<div>
									<Typography component="span">{summary.language}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Show Date:</Typography>
								</div>
								<div>
									<Typography component="span">{summary.showDate}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Show Time:</Typography>
								</div>
								<div>
									<Typography component="span">{summary.showTime}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Tickets:</Typography>
								</div>
								<div>
									<Typography component="span">{summary.tickets}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<div className="container-left">
									<Typography component="span">Unit Price:</Typography>
								</div>
								<div>
									<Typography component="span">{summary.unitPrice}</Typography>
								</div>
							</div>
							<br />

							<div className="container">
								<FormControl className="formControl">
									<InputLabel htmlFor="coupon">
										<Typography>Coupon Code</Typography>
									</InputLabel>
									{/* <Input id="coupon" type="text" onChange={this.couponChangeHandler} /> */}
									<Select
										id="coupon"
										value={this.state.couponCode}
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
									<Typography component="span">{this.state.totalPrice}</Typography>
								</div>
							</div>
							<br />


							<Button variant="contained" color="primary" onClick={this.handleClick}>CONFIRM BOOKING</Button>
						</CardContent>
					</Card>
				</div>
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					open={open}
					onClose={this.handleClose}
					className={classes.anchorOriginTopCenter}
				// autoHideDuration={6000}
				>
					<MySnackbarContentWrapper
						onClose={this.handleClose}
						variant="success"
						message="Booking Confirmed!"
					/>
				</Snackbar>
			</>
		);
	}
}

const variantIcon = {
	success: CheckCircleIcon
};

const styles1 = theme => ({
	success: {
		backgroundColor: "black",
		color: green[600]
	},
	icon: {
		fontSize: '1.5rem',
	},
	closeicon: {
		color: "white"
	},
	iconVariant: {
		opacity: 1,
		marginRight: theme.spacing.unit * 1.5,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
});

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

function MySnackbarContent(props) {
	const { classes, className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={classNames(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={classNames(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.close}
					onClick={onClose}
				>
					<CloseIcon className={classNames(classes.icon, classes.closeicon)} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

MySnackbarContent.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};





export default withRouter(withStyles(styles)(ConfirmMovieShow));