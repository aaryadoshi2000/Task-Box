import api from '../api';
import {
	LOG_IN,
	LOG_OUT,
	UPDATE_USER,
	SAVE_TASKS,
	ADD_TASK,
	DELETE_TASK,
} from './types';
import history from '../history';

export const signUp = (formValues) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/users', {
				...formValues,
			});

			if (response.status === 201) {

				
				history.push('/signin');
			}
		} catch (error) {
			if (error.response.status === 400) {
				return error;
			}
		}
	};
};

export const logIn = (formValues) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/users/login', {
				...formValues,
			});
			if (response.status === 200) {
				dispatch({ type: LOG_IN, payload: response.data });
				history.push('/');
			}
		} catch (error) {
			if (error.response.status === 400) {
				return error.response.status;
			}
		}
	};
};

export const logOut = () => {
	return async (dispatch) => {
		dispatch({
			type: LOG_OUT,
		});
		history.push('/');
	};
};

export const fetchUser = (token) => {
	return async (dispatch) => {
		try {
			const response = await api.get('/users/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				dispatch({ type: LOG_IN, payload: response.data });
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
			dispatch({ type: LOG_OUT });
		}
	};
};

export const uploadAvatar = (token, formData) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/users/me/avatar', formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				dispatch({ type: UPDATE_USER, payload: response.data });
				history.push('/profile');
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteUser = (token) => {
	return async (dispatch) => {
		try {
			const response = await api.delete('/users/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				dispatch({
					type: LOG_OUT,
				});
				history.push('/');
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateUser = (token, formValues) => {
	return async (dispatch) => {
		try {
			const response = await api.patch('/users/me', formValues, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				dispatch({
					type: UPDATE_USER,
					payload: response.data,
				});
				history.push('/profile');
			}
		} catch (error) {
			return error;
		}
	};
};

export const fetchTasks = (token) => {
	return async (dispatch) => {
		try {
			const response = await api.get('/tasks', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				dispatch({
					type: SAVE_TASKS,
					payload: response.data,
				});
			}
		} catch (error) {}
	};
};

export const addTask = (task, token) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/tasks', task, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 201) {
				dispatch({
					type: ADD_TASK,
					payload: response.data,
				});
			}
		} catch (error) {}
	};
};

export const deleteTask = (task, token) => {
	return async (dispatch) => {
		try {
			const response = await api.delete(`/tasks/${task._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.status === 200) {
				dispatch({
					type: DELETE_TASK,
					payload: response.data,
				});
			}
		} catch (error) {}
	};
};

export const updateTask = (task, token) => {
	return async (dispatch) => {
		console.log(token);
		try {
			const response = await api.patch(`/tasks/${task._id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			if (response.status === 200) {
				console.log('200 OK');
				console.log(response.data);
			}
		} catch (error) {
			console.log(error.response.request);
		}
	};
};
