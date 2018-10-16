import React, { Component } from 'react';
import './Header.css';

import Button from '@material-ui/core/Button';
import logo from "../../assets/logo.svg";
import Modal from "react-modal";
class Header extends Component {

	constructor(props) {
		super(props);
		this.state ={
			showModal: false
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
							onRequestClose={this.closeLoginModalHandler}/>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;