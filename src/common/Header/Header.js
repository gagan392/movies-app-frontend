import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import Button from '@material-ui/core/Button';
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import { Tab, Tabs, withStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";

import CustomSnackBar from "../../common/SnackBar/SnackBar";

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

const styles = () => ({
	success: {
		color: 'green'
	},
	error: {
		color: 'red'
	},
	anchorOriginTopCenter: {
		top: '4rem'
	}
})

const TabContainer = props => {
	return (
		<Typography component="div" style={{ padding: 0, textAlign: "center" }}>
			{props.children}
		</Typography>
	);
}

TabContainer.propTypes = {
	children: PropTypes.node.isRequired
}

const initObj = {
	showModal: false,
	showSnackBar: false,
	snackBarMessage: "",
	snackBarVariant: "success",
	value: 0,
	username: "",
	loginpassword: "",
	usernameRequired: "dispNone",
	loginpasswordRequired: "dispNone",
	firstname: "",
	lastname: "",
	email: "",
	registerpassword: "",
	contactno: "",
	firstnameRequired: "dispNone",
	lastnameRequired: "dispNone",
	emailRequired: "dispNone",
	registerpasswordRequired: "dispNone",
	contactnoRequired: "dispNone",
	registerationSuccess: false,
	userExist: false,
	loggedIn: sessionStorage.getItem("access-token") == null ? false : true
}

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = initObj;
		this.apiClient = this.props.apiClient;
	}

	openLoginModalHandler = () => {
		this.setState({ ...initObj, showModal: true });
	}

	closeLoginModalHandler = () => {
		this.setState(initObj);
	}

	loginTabChangeHandler = (e, value) => {
		this.setState({ ...initObj, showModal: true, value: value });
	}

	loginButtonHanlder = async () => {
		const currState = this.state;
		currState.usernameRequired = this.state.username === "" ? "dispBlock" : "dispNone";
		currState.loginpasswordRequired = this.state.loginpassword === "" ? "dispBlock" : "dispNone";
		this.setState(currState);
		if (currState.usernameRequired === "dispBlock" || currState.loginpasswordRequired === "dispBlock") return;

		try {
			const res = await this.props.apiClient.login(currState.username, currState.loginpassword);
			sessionStorage.setItem("access-token", res.headers["access-token"]);
			sessionStorage.setItem("uuid", res.data.id);
			this.setState({
				...currState,
				userinfo: res.data,
				loggedIn: true,
				showModal: false,
				showSnackBar: true,
				snackBarMessage: "login Successfull!",
				snackBarVariant: "success"
			});
		} catch (error) {
			sessionStorage.removeItem("access-token");
			sessionStorage.removeItem("uuid");
			const currState = {
				...this.state,
				loggedIn: false,
				showSnackBar: true,
				snackBarMessage: "login failed. Try again!",
				snackBarVariant: "warning"
			}
			this.setState(currState);
		}
	}

	usernameChangeHandler = e => {
		this.setState({
			username: e.target.value
		});
	}

	loginpasswordChangeHandler = e => {
		this.setState({
			loginpassword: e.target.value
		});
	}

	emailChangeHandler = e => {
		this.setState({
			email: e.target.value
		});
	}

	registerButtonHandler = async () => {
		const { apiClient } = this.props;
		const currState = this.state;
		currState.firstnameRequired = currState.firstname === "" ? "dispBlock" : "dispNone";
		currState.lastnameRequired = currState.lastname === "" ? "dispBlock" : "dispNone";
		currState.emailRequired = currState.email === "" ? "dispBlock" : "dispNone";
		currState.registerpasswordRequired = currState.registerpassword === "" ? "dispBlock" : "dispNone";
		currState.contactnoRequired = currState.contactno === "" ? "dispBlock" : "dispNone";

		this.setState(currState);

		if (currState.firstnameRequired === "dispBlock" || currState.lastnameRequired === "dispBlock" || currState.emailRequired === "dispBlock" || currState.showTimeRequired === "dispBlock" || currState.registerpasswordRequired === "dispBlock" || currState.contactnoRequired === "dispBlock") return;

		const data = JSON.stringify({
			"email_address": this.state.email,
			"first_name": this.state.firstname,
			"last_name": this.state.lastname,
			"mobile_number": this.state.contactno,
			"password": this.state.registerpassword
		});

		try {
			const response = await apiClient.signup(data);
			this.setState({
				registerationSuccess: response.status === "ACTIVE",
				showSnackBar: true,
				snackBarMessage: "Registration Successfull. Please Login!",
				snackBarVariant: "success"
			});
		} catch (error) {
			this.setState({
				userExist: error.message.includes("status code 422"),
				showSnackBar: true,
				snackBarMessage: "User already exist. Please Login!",
				snackBarVariant: "warning"
			});
		}

	}

	firstnameChangeHandler = e => {
		this.setState({
			firstname: e.target.value
		})
	}

	lastnameChangeHandler = e => {
		this.setState({
			lastname: e.target.value
		})
	}

	registerpasswordHandler = e => {
		this.setState({
			registerpassword: e.target.value
		})
	}

	contactnoHandler = e => {
		this.setState({
			contactno: e.target.value
		})
	}

	logoutClickHandler = () => {
		const currState = {
			loggedIn: false,
			showSnackBar: true,
			snackBarMessage: "Logged out successfully!",
			snackBarVariant: "info"
		}
		this.setState(currState);
		// sessionStorage.removeItem("access-token");
		// sessionStorage.removeItem("uuid");
	}

	snackBarCloseHandler = () => {
		this.setState({ showSnackBar: false });
	}

	render() {
		const { classes, showBookShowButton, movieId } = this.props;
		console.log(" header render ", this.state);

		return (
			<div>
				<div className="app-header">
					<img src={logo} className="app-logo" alt="Movies App Logo" />
					<div className="login-button">
						{!this.state.loggedIn === true ?
							<Button variant="contained" color="default" onClick={this.openLoginModalHandler}>Login</Button>
							:
							<Button variant="contained" color="default" onClick={this.logoutClickHandler}>Logout</Button>}
					</div>
					{showBookShowButton &&
						<Link id="bookshow-button" to={`/bookshow/${movieId}`}>
							<div className="bookshow-button">
								<Button variant="contained" color="primary">Book Show</Button>
							</div>
						</Link>
					}
					<Modal
						ariaHideApp={false}
						isOpen={this.state.showModal}
						contentLabel="Login"
						onRequestClose={this.closeLoginModalHandler}
						style={customStyles}
					>
						<Tabs className="tabs" value={this.state.value} onChange={this.loginTabChangeHandler}>
							<Tab label="Login"></Tab>
							<Tab label="Register"></Tab>
						</Tabs>
						{this.state.value === 0 &&
							<TabContainer>
								<FormControl required>
									<InputLabel htmlFor="username"> Username</InputLabel>
									<Input id="username" type="text" username={this.state.username} onChange={this.usernameChangeHandler} />
									<FormHelperText className={this.state.usernameRequired}>
										<span className="textColorRed">required</span>
									</FormHelperText>
								</FormControl>
								<br /><br />

								<FormControl required>
									<InputLabel htmlFor="loginpassword"> Password</InputLabel>
									<Input id="loginpassword" type="password" loginpassword={this.state.loginpassword} onChange={this.loginpasswordChangeHandler} />
									<FormHelperText className={this.state.loginpasswordRequired}>
										<span className="textColorRed">required</span>
									</FormHelperText>
								</FormControl>
								<br /><br />

								<Button variant="contained" color="primary" onClick={this.loginButtonHanlder}> LOGIN </Button>
							</TabContainer>
						}
						{this.state.value === 1 &&
							<TabContainer>
								<FormControl required>
									<InputLabel htmlFor="firstname">First Name</InputLabel>
									<Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.firstnameChangeHandler} />
									<FormHelperText className={this.state.firstnameRequired}>
										<span className="textColorRed">required</span>
									</FormHelperText>
								</FormControl><br /><br />

								<FormControl required>
									<InputLabel htmlFor="lastname">Last Name</InputLabel>
									<Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.lastnameChangeHandler} />
									<FormHelperText className={this.state.lastnameRequired}>
										<span className="textColorRed">required</span>
									</FormHelperText>
								</FormControl><br /><br />

								<FormControl required>
									<InputLabel htmlFor="email">Email</InputLabel>
									<Input id="email" type="text" email={this.state.email} onChange={this.emailChangeHandler} />
									<FormHelperText className={this.state.emailRequired}>
										<span className="textColorRed">required</span>
									</FormHelperText>
								</FormControl><br /><br />

								<FormControl required>
									<InputLabel htmlFor="registerpassword">Password</InputLabel>
									<Input id="registerpassword" type="password" registerpassword={this.state.registerpassword} onChange={this.registerpasswordHandler} />
									<FormHelperText className={this.state.registerpasswordRequired}>
										<span className="textColorRed">required</span>
									</FormHelperText>
								</FormControl><br /><br />

								<FormControl required>
									<InputLabel htmlFor="contact_no">Contact No.</InputLabel>
									<Input id="contact_no" type="text" contactno={this.state.contactno} onChange={this.contactnoHandler} />
									<FormHelperText className={this.state.contactnoRequired}>
										<span className="textColorRed">required</span>
									</FormHelperText>
								</FormControl><br /><br />

								<Button variant="contained" color="primary" onClick={this.registerButtonHandler}> Register </Button>
							</TabContainer>
						}
					</Modal>
				</div>
				<CustomSnackBar
					vertical="top"
					horizontal="center"
					open={this.state.showSnackBar}
					onClose={this.snackBarCloseHandler}
					classes={{ anchorOriginTopCenter: classes.anchorOriginTopCenter }}
					variant={this.state.snackBarVariant}
					message={this.state.snackBarMessage}
				/>
			</div>
		);
	}
}

export default withStyles(styles)(Header);