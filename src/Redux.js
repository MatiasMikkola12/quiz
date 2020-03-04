import {
    combineReducers,
    createStore,
} from 'redux';

// actions.js
export const changeAnswer = responses => ({
    type: 'CHANGE_ANSWER',
    responses,
});

export const correctAnswers = answers => ({
    type: 'CORRECT_ANSWER',
    answers,
});

export const setErrors = errors => ({
    type: 'SET_ERRORS',
    errors: errors,
});

// reducers.js
export const mainReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_ANSWER':
            return action.responses;
        case 'CORRECT_ANSWER':
            return Object.assign([], state, action.answers)
        case 'SET_ERRORS':
            return Object.assign([], state, action.errors)
        default:
            return state;
    }
};

export const reducers = combineReducers({
    mainReducer,
});

// store.js
export function configureStore(initialState = {}) {
    const store = createStore(reducers, initialState);
    return store;
};

export const store = configureStore();