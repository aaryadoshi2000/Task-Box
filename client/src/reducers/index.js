import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import taskReducer from './taskReducer';

export default combineReducers({
	auth: userReducer,
	tasks: taskReducer,
	form: formReducer,
});
