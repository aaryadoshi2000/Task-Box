import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux';
import { logIn } from '../../actions';

class UserLogin extends React.Component {
	renderError({ error, touched }) {
		if (touched && error) {
			return (
				<div
					style={{
						color: '#770000',
					}}
				>
					<i className="ui icon exclamation circle" />
					{error}
				</div>
			);
		}
	}

	renderInput = ({ input, label, type, meta }) => {
		const classes = `field ${meta.error && meta.touched ? 'error' : ''}`;
		return (
			<div className={classes}>
				<label>{label}</label>
				<input
					{...input}
					placeholder={label}
					type={type}
					autoComplete="off"
				/>
				{this.renderError(meta)}
			</div>
		);
	};

	renderSubmitError(error) {
		if (error) {
			return (
				<h3
					style={{
						color: '#770000',
					}}
				>
					<i className="ui icon exclamation circle" />
					{error && <strong>{error}</strong>}
				</h3>
			);
		}
	}

	onSubmit = (formValues) => {
		return new Promise((resolve) => setTimeout(resolve, 1)).then(
			async () => {
				const status = await this.props.logIn(formValues);

				if (status === 400) {
					throw new SubmissionError({
						_error: 'Invalid credentials. Login failed!',
					});
				}
			}
		);
	};

	render = () => {
		const { error, handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<React.Fragment>
				<h3>Login to your account</h3>
				<form
					className="ui form error"
					onSubmit={handleSubmit(this.onSubmit)}
				>
					<Field
						name="email"
						type="text"
						component={this.renderInput}
						label="Email"
					/>
					<Field
						name="password"
						type="password"
						component={this.renderInput}
						label="Password"
					/>
					<div>
						{this.renderSubmitError(error)}
						<div>
							<button
								className="ui button primary"
								type="submit"
								disabled={submitting}
							>
								Log In
							</button>

							<button
								className="ui button red"
								type="button"
								disabled={pristine || submitting}
								onClick={reset}
							>
								Clear Values
							</button>
						</div>
					</div>
				</form>
			</React.Fragment>
		);
	};
}

const validate = (formValues) => {
	const errors = {};

	if (!formValues.email) {
		errors.email = 'You must enter an email';
	}

	if (!formValues.password) {
		errors.password = 'You must enter a password';
	}

	return errors;
};

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = {
	logIn,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	reduxForm({
		form: 'Login',
		validate: validate,
	})(UserLogin)
);
