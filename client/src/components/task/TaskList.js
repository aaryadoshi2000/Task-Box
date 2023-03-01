import React from 'react';
import { connect } from 'react-redux';
import { fetchTasks, addTask, deleteTask } from '../../actions';
import '../../styles/todo.css';
import { Collapse } from 'react-collapse';

class TaskList extends React.Component {
	state = {
		inputVal: '',
		isOpened: true,
	};

	componentDidMount() {
		document.body.classList.add('tasks-body');
		const token = localStorage.getItem('token');
		if (token) {
			this.props.fetchTasks(token);
		}
	}

	componentWillUnmount() {
		document.body.classList.remove('tasks-body');
	}

	onKeyPress = (event) => {
		if (event.which === 13) {
			const token = this.props.token;
			this.props.addTask({ description: this.state.inputVal }, token);
			this.setState({ inputVal: '' });
		}
	};

	onInputChange = (event) => {
		this.setState({ inputVal: event.target.value });
	};

	renderTask = (task) => {
		return (
			<div>
				{' '}
				<span
					className="tasks-span"
					onClick={(e) => {
						const token = this.props.token;
						this.props.deleteTask(task, token);
						e.stopPropagation();
					}}
				>
					{' '}
					<i className="fas fa-trash-alt"></i>{' '}
				</span>{' '}
				{task.description}
			</div>
		);
	};

	// onTaskClick = (task) => {
	// 	console.log(task);
	// 	const token = this.props.token;
	// 	task.completed = !task.completed;
	// 	this.props.updateTask(task, token);
	// };

	renderList = () => {
		if (this.props.tasks) {
			return this.props.tasks.map((task) => {
				if (!task.completed) {
					return (
						<li
							key={task._id}
							// onClick={() => {
							// 	this.onTaskClick(task);
							// }}
						>
							{this.renderTask(task)}
						</li>
					);
				}

				return (
					<li className="completed" key={task._id}>
						{this.renderTask(task)}
					</li>
				);
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<div id="tasks-container">
					<h1 id="list-header">
						Tasks
						<i
							className="fas fa-plus"
							onClick={() => {
								if (this.state.isOpened) {
									this.setState({ isOpened: false });
								} else {
									this.setState({ isOpened: true });
								}
							}}
						/>
					</h1>
					<Collapse isOpened={this.state.isOpened}>
						<input
							type="text"
							placeholder="Add New Todo"
							value={this.state.inputVal}
							onKeyPress={this.onKeyPress}
							onChange={this.onInputChange}
						/>
					</Collapse>
					<ul>{this.renderList()}</ul>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token,
		tasks: state.tasks,
	};
};

const mapDispatchToProps = {
	fetchTasks,
	addTask,
	deleteTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
