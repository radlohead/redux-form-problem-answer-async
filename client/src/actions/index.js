import axios from 'axios';

export const PROBLEM = 'PROBLEM';
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
        const response = await axios.post('http://localhost:4000/api/submit', post);
        
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