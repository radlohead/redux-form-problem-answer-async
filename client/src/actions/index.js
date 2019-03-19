import axios from 'axios';
import qs from 'qs';

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
        // const response = await axios.post('http://localhost:4000/api/submit');

        const response = await axios({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: 'post',
            name: 'input',
            url: 'http://localhost:4000/api/submit',
            // data:  qs.stringify({input: post})
            data: qs.stringify({input: [
                { answer: "2"},
                { answer: "2"},
                { answer: "2"},
                {answer: "1"},
                {answer: "2"},
                {answer: "3"},
                { answer: "3"},
                { answer: "3"},
                { answer: "3"},
                { answer: "3"},
                { answer: "23"},
                { answer: "6"},
                { answer: "3"}
            ]})
        })
        console.log('fetchSubmit', response);
        
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