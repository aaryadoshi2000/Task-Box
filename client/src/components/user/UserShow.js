import React from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import '../../styles/UserShow.css';
import history from '../../history';
import { Link } from 'react-router-dom';

class UserShow extends React.Component {
	state = {
		mousePointing: false,
	};

	onMouseEnter = () => {
		this.setState({ mousePointing: true });
	};

	onMouseExit = () => {
		this.setState({ mousePointing: false });
	};

	renderPointer = () => {
		if (this.state.mousePointing) {
			return (
				<div
					className="ui left pointing black basic label"
					style={{
						position: 'absolute',
						zIndex: 10,
						top: 40,
						left: 112,
					}}
				>
					Upload avatar
				</div>
			);
		}
	};

	onClick = () => {
		history.push('/profile/update-avatar');
	};

	renderAvatar = () => {
		if (this.props.user) {
			if (this.props.user.avatar) {
				const classes = `avatar ${
					this.state.mousePointing ? 'mouse-pointer' : ''
				}`;
				return (
					<React.Fragment>
						<img
							src={`http://localhost:3001/users/${this.props.user._id}/avatar`}
							alt="not found"
							className={classes}
							onMouseEnter={this.onMouseEnter}
							onMouseLeave={this.onMouseExit}
							onClick={this.onClick}
						/>
						{this.renderPointer()}
					</React.Fragment>
				);
			} else {
				const classes = `grey massive aligned icon user circle ${
					this.state.mousePointing ? 'mouse-pointer' : ''
				}`;
				return (
					<span>
						<i
							className={classes}
							onMouseEnter={this.onMouseEnter}
							onMouseLeave={this.onMouseExit}
							onClick={this.onClick}
						/>
						{this.renderPointer()}
					</span>
				);
			}
		}
	};
	renderContentHeader() {
		if (!this.props.user) {
			return (
				<div>
					<Loader />
				</div>
			);
		} else {
			return (
				<React.Fragment>
					{this.renderAvatar()}
					<span style={{ fontSize: '30px', marginBottom: '10px' }}>
						{this.props.user.name}
					</span>
				</React.Fragment>
			);
		}
	}

	renderContent() {
		if (this.props.user) {
			return (
				<div>
					<div
						className="ui segment"
						style={{
							fontSize: '15px',
							WebkitBoxShadow: 'none',
							border: 'none',
						}}
					>
						<div
							className="ui relaxed divided list"
							style={{ fontSize: '15px' }}
						>
							<div className="item">
								<div className="content">
									<strong className="field-label">
										Age :
									</strong>
									<span className="field-span">
										{this.props.user.age}
									</span>
								</div>
							</div>

							<div className="item">
								<div className="content">
									<strong className="field-label">
										Email :
									</strong>
									<span className="field-span">
										{this.props.user.email}
									</span>
								</div>
							</div>
						</div>
					</div>

					<div>
						<Link
							to="/profile/update"
							className="ui button primary"
						>
							Edit
						</Link>
						<Link to="/profile/delete" className="ui button red">
							Delete
						</Link>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<div
					style={{
						margin: '6px 0 0',
						paddingBottom: '10px',
						borderBottom: '1px solid #4a4a4a',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'flex-start',
						position: 'relative',
						zIndex: '1',
					}}
				>
					{this.renderContentHeader()}
				</div>
				<div>{this.renderContent()}</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
