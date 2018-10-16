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
		<Typography component="div" style={{ padding: 0 }}>
			{props.children}
		</Typography>
	);
}
class Header extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			value: 0
		}
	}

	openLoginModalHandler = () => {
		this.setState({
			showModal: true
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
							<Tabs value={this.state.value} onChange={this.loginTabChangeHandler}>
								<Tab label="Login"></Tab>
								<Tab label="Register"></Tab>
							</Tabs>
							<TabContainer>
								<FormControl required>
									<InputLabel htmlFor="username"> Username</InputLabel>
									<Input id="username" type="text" />
								</FormControl>

								<FormControl required>
									<InputLabel htmlFor="passowrd"> Passowrd</InputLabel>
									<Input id="passowrd" type="passowrd" />
								</FormControl>
							</TabContainer>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;