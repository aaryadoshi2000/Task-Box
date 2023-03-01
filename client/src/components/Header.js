import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import Auth from './Auth';

class Header extends React.Component {
	renderProfileBtn() {
		if (!this.props.user) {
			return (
				<p></p>
			);
		} else {
			return (
				<Navbar.Brand>
					<Link
						to="/profile"
						style={{ color: '#2980b9', textDecoration: 'none' }}
					>
						Profile
					</Link>
				</Navbar.Brand>
			);
		}
	}

	renderTaskBtn() {
		if (!this.props.user) {
			return (
				<p></p>
			);
		} else {
			return (
				<Navbar.Brand>
					<Link
						to="/tasks"
						style={{
							color: '#2980b9',
							textDecoration: 'none',
						}}
					>
						Tasks
					</Link>
				</Navbar.Brand>
			);
		}
	}

	render() {
		return (
			<div>
				<Navbar bg="light" expand="sm" style={{ marginBottom: '15%' }}>
					<Navbar.Brand>
						<Link
							to="/"
							style={{ color: '#2980b9', textDecoration: 'none' }}
						>
							<h3>Task Box</h3>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="mr-auto"></Nav>
						<Nav>
							{this.renderTaskBtn()}
							{this.renderProfileBtn()}
							<Auth />
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
