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
			password: "",
			usernameRequired: "dispNone",
			passwordRequired: "dispNone"
		}
	}

	openLoginModalHandler = () => {
		this.setState({
			showModal: true,
			value: 0,
			username: "",
			password: "",
			usernameRequired: "dispNone"
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
			passwordRequired: prevState.password === "" ? "dispBlock" : "dispNone"
		})});
	}

	usernameChangeHandler = e => {
		this.setState({
			username: e.target.value
		});
	}

	passwordChangeHandler = e => {
		this.setState({
			password: e.target.value
		});
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
										<Input id="username" type="text" username={this.state.username} onChange={this.usernameChangeHandler}/>
										<FormHelperText className={this.state.usernameRequired}>
											<span className="textColorRed">required</span>
										</FormHelperText>
									</FormControl>
									<br /><br />

									<FormControl required>
										<InputLabel htmlFor="password"> Password</InputLabel>
										<Input id="password" type="password" password={this.state.password} onChange={this.passwordChangeHandler}/>
										<FormHelperText className={this.state.passwordRequired}>
											<span className="textColorRed">required</span>
										</FormHelperText>
									</FormControl>
									<br /><br />

									<Button variant="contained" color="primary" onClick={this.loginButtonHanlder}> LOGIN </Button>
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