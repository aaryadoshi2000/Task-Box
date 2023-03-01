import axios from 'axios';

export default axios.create({
	baseURL: 'https://task-box.herokuapp.com/api',
});
