import { reducer as reduxFormReducer } from 'redux-form';
import { PROBLEM, PROBLEM_IS_FETCHED, PROBLEM_IS_ERROR, SUBMIT_IS_FETCHED, SUBMIT_IS_ERROR } from '../actions';
import { combineReducers } from 'redux';

const problem = (state = {}, action) => {
    switch(action.type) {
        case PROBLEM:
            return {
                ...state,
                type: action.type
            }
        case PROBLEM_IS_FETCHED:
            return {
                ...state,
                type: action.type,
                problemJSON: action.problemJSON
            }
        case PROBLEM_IS_ERROR:
            return {
                ...state,
                type: action.type,
                problemJSON: action.problemJSON
            }
        case SUBMIT_IS_FETCHED:
            return {
                ...state,
                type: action.type,
                submitJSON: action.submitJSON
            }
        case SUBMIT_IS_ERROR:
            return {
                ...state,
                type: action.type,
                submitJSON: action.submitJSON
            }
        default:
            return state
    }
}

const reducers = combineReducers({
    form: reduxFormReducer,
    problem,
});

export default reducers;