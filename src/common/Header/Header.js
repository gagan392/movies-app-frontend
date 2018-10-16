import React, { Component } from 'react';
import './Header.css';

import Button from '@material-ui/core/Button';
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import { Tab, Tabs } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import PropTypes from "prop-types";
import FormHelperText from "@material-ui/core/FormHelperText";

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

class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
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
			contactnoRequired: "dispNone"
		}
	}

	openLoginModalHandler = () => {
		this.setState({
			showModal: true,
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
			contactnoRequired: "dispNone"
		});
	}

	closeLoginModalHandler = () => {
		this.setState({
			showModal: false
		});
	}

	loginTabChangeHandler = (e, value) => {
		this.setState({
			value: value
		});
	}

	loginButtonHanlder = () => {
		this.setState((prevState) => {
			return ({
				usernameRequired: prevState.username === "" ? "dispBlock" : "dispNone",
				loginpasswordRequired: prevState.loginpassword === "" ? "dispBlock" : "dispNone"
			})
		});
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

	registerButtonHandler = () => {
		this.setState(prevState => {
			return ({
				firstnameRequired: prevState.firstname === "" ? "dispBlock" : "dispNone",
				lastnameRequired: prevState.lastname === "" ? "dispBlock" : "dispNone",
				emailRequired: prevState.email === "" ? "dispBlock" : "dispNone",
				registerpasswordRequired: prevState.registerpassword === "" ? "dispBlock" : "dispNone",
				contactnoRequired: prevState.contactno === "" ? "dispBlock" : "dispNone"
			})
		});
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

	render() {
		return (
			<div>
				<div className="app-header">
					<img src={logo} className="app-logo" alt="Movies App Logo" />
					<div className="login-button">
						<Button variant="contained" color="default" onClick={this.openLoginModalHandler}>
							Login
                        </Button>
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
				</div>
			</div >
		);
	}
}

export default Header;