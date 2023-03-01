import React from 'react';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import history from '../../history';
import { deleteUser } from '../../actions';
import { connect } from 'react-redux';

class UserDelete extends React.Component {
	onDeleteClick = () => {
		this.props.deleteUser(this.props.token);
	};

	renderContent = () => {
		return 'Are you sure you want to delete your account?';
	};

	renderActions() {
		return (
			<React.Fragment>
				<button className="ui button red" onClick={this.onDeleteClick}>
					Delete
				</button>
				<Link to={'/profile'} className="ui button">
					Cancel
				</Link>
			</React.Fragment>
		);
	}

	render() {
		return (
			<Modal
				title="Delete User"
				content={this.renderContent()}
				actions={this.renderActions()}
				onDismiss={() => {
					history.push('/profile');
				}}
			/>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
	};
};

const mapDispatchToProps = {
	deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDelete);
