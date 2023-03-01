import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Form, Message, Card, Image, Grid } from 'semantic-ui-react';
import { uploadAvatar } from '../../actions';

class UserUpdateAvatar extends React.Component {
	static propTypes = {
		previewLogoUrl: PropTypes.string,
		mimeType: PropTypes.string,
		maxWeight: PropTypes.number,
		// redux-form porps
		handleSubmit: PropTypes.func.isRequired,
	};
	static defaultProps = {
		previewLogoUrl: 'https://imgplaceholder.com/400x300',
		mimeType: 'image/jpeg, image/png',
		maxWeight: 1000,
	};
	validateImageWeight = (imageFile) => {
		if (imageFile && imageFile.size) {
			// Get image size in kilobytes
			const imageFileKb = imageFile.size / 1024;
			const { maxWeight } = this.props;

			if (imageFileKb > maxWeight) {
				return `Image size must be less or equal to ${maxWeight}kb`;
			}
		}
	};
	validateImageFormat = (imageFile) => {
		if (imageFile) {
			const { mimeType } = this.props;

			if (!mimeType.includes(imageFile.type)) {
				return `Image mime type must be ${mimeType}`;
			}
		}
	};
	handlePreview = (imageUrl) => {
		const previewImageDom = document.querySelector('.preview-image');
		previewImageDom.src = imageUrl;
	};
	handleChange = (event, input) => {
		event.preventDefault();
		let imageFile = event.target.files[0];
		if (imageFile) {
			const localImageUrl = URL.createObjectURL(imageFile);
			const imageObject = new window.Image();

			imageObject.onload = () => {
				imageFile.width = imageObject.naturalWidth;
				imageFile.height = imageObject.naturalHeight;
				input.onChange(imageFile);
				URL.revokeObjectURL(imageFile);
			};
			imageObject.src = localImageUrl;
			this.handlePreview(localImageUrl);
		}
	};
	renderFileInput = ({ input, type, meta }) => {
		const { mimeType } = this.props;
		return (
			<div>
				<input
					name={input.name}
					type={type}
					accept={mimeType}
					onChange={(event) => this.handleChange(event, input)}
				/>
				{meta && meta.invalid && meta.error && (
					<Message negative header="Error:" content={meta.error} />
				)}
			</div>
		);
	};

	handleSubmitForm = (formValues) => {
		const formData = new FormData();
		formData.append('avatar', formValues.image);
		const token = this.props.token;
		this.props.uploadAvatar(token, formData);
	};
	render() {
		const { previewLogoUrl, maxWeight, handleSubmit } = this.props;
		return (
			<Grid
				centered
				style={{ height: '100%' }}
				verticalAlign="middle"
				padded
			>
				<Grid.Column style={{ maxWidth: 400 }}>
					<Card fluid>
						<Image
							src={previewLogoUrl}
							alt={'preview'}
							className="preview-image"
							style={{ height: '300px', objectFit: 'cover' }}
						/>
						<Card.Content>
							<Card.Header>Upload Avatar</Card.Header>
							<Card.Description>
								Image has to:
								<ul>
									<li>be JPEG or PNG</li>
									<li>have Size ≤ {maxWeight}kb</li>
								</ul>
							</Card.Description>
						</Card.Content>
						<Card.Content>
							<Form>
								<Form.Field>
									<Field
										name="image"
										type="file"
										validate={[
											this.validateImageWeight,
											this.validateImageFormat,
										]}
										component={this.renderFileInput}
									/>
								</Form.Field>
								<Button
									primary
									type="submit"
									className="form-submit-button"
									onClick={handleSubmit(
										this.handleSubmitForm
									)}
								>
									Submit
								</Button>
							</Form>
						</Card.Content>
					</Card>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => {
	return { user: state.auth.user, token: state.auth.token };
};

const mapDispatchToProps = {
	uploadAvatar,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	reduxForm({
		form: 'UpdateAvatar',
	})(UserUpdateAvatar)
);
