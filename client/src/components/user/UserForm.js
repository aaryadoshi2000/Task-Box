import React from 'react';
import { Field, reduxForm } from 'redux-form';

class UserForm extends React.Component {
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
		this.props.onSubmit(formValues);
	};

	render = () => {
		const { error, handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<form
				className="ui form error"
				onSubmit={handleSubmit(this.onSubmit)}
			>
				<Field
					name="name"
					type="text"
					component={this.renderInput}
					label="Name"
				/>
				<Field
					name="email"
					type="text"
					component={this.renderInput}
					label="Email"
				/>
				<Field
					name="age"
					type="number"
					component={this.renderInput}
					label="Age"
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
							Submit
						</button>

						<button
							className="ui button red"
							type="button"
							disabled={pristine || submitting}
							onClick={reset}
						>
							Clear
						</button>
					</div>
				</div>
			</form>
		);
	};
}

const validateForm = (formValues) => {
	const errors = {};

	if (!formValues.name) {
		errors.name = 'You must enter a name';
	}

	if (formValues.age) {
		if (isNaN(formValues.age)) {
			errors.age = 'Age must be a number';
		} else if (formValues.age < 0) {
			errors.age = 'Age must not be negative';
		}
	}

	if (!formValues.email) {
		errors.email = 'You must enter an email';
	}

	if (!formValues.password) {
		errors.password = 'You must enter a password';
	} else if (formValues.password.length < 7) {
		errors.password = 'Password must have length atleast 7';
	} else if (formValues.password.toLowerCase().includes('password')) {
		errors.password = 'It must not contain "password"';
	}

	return errors;
};

export default reduxForm({
	form: 'userForm',
	validate: validateForm,
})(UserForm);
