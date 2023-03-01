import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser, logOut } from '../actions';
import '../styles/style.css';

class Auth extends React.Component {
	componentDidMount = () => {
		const token = localStorage.getItem('token');
		if (token) {
			this.props.fetchUser(token);
		}
	};

	componentDidUpdate = () => {
		if (this.props.isSignedIn === null) {
			return;
		} else if (this.props.isSignedIn === true) {
			localStorage.setItem('token', this.props.token);
		} else {
			localStorage.setItem('token', '');
		}
	};

	onSignOutClick = () => {
		this.props.logOut(this.props.token);
	};

	renderAuthButton = () => {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn === true) {
			return (
				<div
					className="ui medium button blue"
					onClick={this.onSignOutClick}
					// style={{ color: 'white', background: '#2980b9' }}
				>
					Logout
				</div>
			);
		} else {
			return (
				<span>
				<Link
					to="/signin"
					className="ui medium button blue"
					// style={{ color: 'white', background: '#2980b9' }}
				>
					Login
				</Link>
				<Link
					to="/signup"
					className='ui medium button blue'>
						Register
				</Link>
				</span>
				
			);
		}
	};

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
		token: state.auth.token,
	};
};

const mapDispatchToProps = {
	fetchUser,
	logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
