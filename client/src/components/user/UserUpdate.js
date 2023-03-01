import React from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import UserForm from './UserForm';
import _ from 'lodash';
import { updateUser } from '../../actions';

class UserUpdate extends React.Component {
	onSubmit = (formValues) => {
		console.log(formValues);
		return new Promise((resolve) => setTimeout(resolve, 1)).then(
			async () => {
				const error = await this.props.updateUser(
					this.props.token,
					formValues
				);

				if (error) {
					if (error.response.status === 400) {
						console.log(error.response);

						if (error.response.data.errors) {
							if (
								error.response.data.errors.email.properties
									.message === 'Given Email is invalid!'
							) {
								throw new SubmissionError({
									_error: 'Invalid email',
								});
							}
						} else {
							if (error.response.data.name === 'MongoError') {
								if (error.response.data.code === 11000) {
									throw new SubmissionError({
										_error: 'Email already in use!',
									});
								}
							}
						}
					}
				}
			}
		);
	};

	render() {
		return (
			<div>
				<h3>Edit User</h3>
				<UserForm
					initialValues={_.pick(
						this.props.user,
						'name',
						'email',
						'age'
					)}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		token: state.auth.token,
	};
};

const mapDispatchToProps = { updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
