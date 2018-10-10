import React, { Component } from 'react';
import './Header.css';

import Button from '@material-ui/core/Button';

class Header extends Component {
	render() {
		return (
			<div>
                <div className="app-header">
                    <div className="login-button">
                        <Button variant="contained" color="default">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
		);
	}
}

export default Header;