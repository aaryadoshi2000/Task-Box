import React from 'react';
import { SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../../actions';
import UserForm from './UserForm';

class UserCreate extends React.Component {
	onSubmit = async (formValues) => {
		return new Promise((resolve) => setTimeout(resolve, 1)).then(
			async () => {
				const error = await this.props.signUp(formValues);

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
				<h3>Create new account</h3>
				<UserForm onSubmit={this.onSubmit} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = {
	signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
