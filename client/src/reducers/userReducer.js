import { LOG_IN, LOG_OUT, UPDATE_USER } from '../actions/types';

const INIT_STATE = {
	isSignedIn: false,
};

const userReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				isSignedIn: true,
				user: action.payload.user,
				token: action.payload.token,
			};
		case LOG_OUT:
			return { ...state, isSignedIn: false, user: null, token: null };
		case UPDATE_USER:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
