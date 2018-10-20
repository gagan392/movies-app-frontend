import React, { Component } from 'react';
import { withStyles, SnackbarContent, IconButton, Snackbar } from '@material-ui/core';
import { Close as CloseIcon, CheckCircle as CheckCircleIcon, Warning as WarningIcon, Error as ErrorIcon, Info as InfoIcon } from "@material-ui/icons";
import { green, amber } from '@material-ui/core/colors';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const style = () => ({});
class CustomSnackBar extends Component {

	render() {
		const { classes, vertical, horizontal, open, onClose, variant, message } = this.props
		return (
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={open}
				onClose={onClose}
				classes={classes}
				autoHideDuration={6000}
			>
				<MySnackbarContentWrapper
					onClose={onClose}
					variant={variant}
					message={message}
				/>
			</Snackbar>
		)
	}
}

export default withStyles(style)(CustomSnackBar);

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const styles = theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	warning: {
		backgroundColor: amber[700],
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

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

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