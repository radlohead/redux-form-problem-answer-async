import axios from 'axios';
import qs from 'qs';

export const PROBLEM = 'PROBLEM';
export const CHOICES = 'CHOICES';
export const DEFAULT_VALUE = '0';
export const PROBLEM_IS_FETCHED = 'PROBLEM_IS_FETCHED';
export const PROBLEM_IS_ERROR = 'PROBLEM_IS_ERROR';
export const SUBMIT_IS_FETCHED = 'SUBMIT_IS_FETCHED';
export const SUBMIT_IS_ERROR = 'SUBMIT_IS_ERROR';

export const fetchProblem = () => {
    return async (dispatch) => {
        const response = await axios.get('http://localhost:4000/api/fetchProblem');
        
        try {
            dispatch({
                type: PROBLEM_IS_FETCHED,
                problemJSON: response.data
            })
        } catch(err) {
            dispatch({
                type: PROBLEM_IS_ERROR,
                problemJSON: err
            })
        }
    }
}

export const fetchSubmit = (post) => {
    return async (dispatch) => {
        const response = await axios.post('http://localhost:4000/api/submit', qs.stringify({input: post}));
        
        try {
            dispatch({
                type: SUBMIT_IS_FETCHED,
                submitJSON: response.data
            })
        } catch(err) {
            dispatch({
                type: SUBMIT_IS_ERROR,
                submitJSON: err
            })
        }
    }
}