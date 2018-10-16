import React, { Component } from 'react';
import './Header.css';

import Button from '@material-ui/core/Button';
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
import { Tab, Tabs } from '@material-ui/core';
class Header extends Component {

	constructor(props) {
		super(props);
		this.state ={
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
							onRequestClose={this.closeLoginModalHandler}>
							<Tabs value={this.state.value} onChange={this.loginTabChangeHandler}>
								<Tab label="Login"></Tab>
								<Tab label="Register"></Tab>
							</Tabs>
						</Modal>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;