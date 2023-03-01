import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

class Home extends React.Component {
	renderBtn() {
		if (this.props.isSignedIn) {
			return (
				<div>
					<Link to="/tasks" className="ui big button blue">
						Show Tasks
					</Link>
				</div>
			);
		} else {
			return (
				<div>
					<Link to="/signup" className="ui big button blue">
						Create Account
					</Link>
				</div>
			);
		}
	}
	render() {
		return (
			<div className="page">
				<Container>
					<Row>
						<Col
							xs={{ offset: 2, span: 8, order: 2 }}
							md={{ offset: 0, span: 6, order: 1 }}
							xl={{ offset: 0, span: 5, order: 1 }}
							// style={
							// 	{
							// 		// border: 'green 1px solid',
							// 	}
							// }
						>
							<img
								src={
									process.env.PUBLIC_URL + '/images/tasks.png'
								}
								alt="tasks"
								style={{ maxWidth: '100%' }}
							/>
						</Col>
						<Col
							xs={{ span: 12, order: 1 }}
							md={{ span: 6, order: 2 }}
							xl={{ span: 7, order: 2 }}
							style={{
								// border: 'red 1px solid',
								textAlign: 'center',
								marginBottom: '5%',
							}}
						>
							<h1
								className="home-content"
								// style={{
								// 	color: '#2980b9',
								// 	marginTop: '5%',
								// 	marginBottom: '7%',
								// }}
							>
								What is this about?
							</h1>
							<h2>
								It is an application that efficiently lets you
								to jot down your day-to-day tasks which boosts
								productivity by organizing your life well.
							</h2>
						</Col>
					</Row>
					<Row>
						<Col
							xl={{ span: 12 }}
							style={{
								textAlign: 'center',
								margin: '8% 0',
							}}
						>
							{this.renderBtn()}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.auth.isSignedIn,
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
