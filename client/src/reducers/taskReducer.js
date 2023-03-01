import { SAVE_TASKS, ADD_TASK, DELETE_TASK } from '../actions/types';

const taskReducer = (state = [], action) => {
	switch (action.type) {
		case SAVE_TASKS:
			return action.payload;
		case ADD_TASK:
			return [...state, action.payload];
		case DELETE_TASK:
			return state.filter((task) => task._id !== action.payload._id);
		default:
			return state;
	}
};

export default taskReducer;
