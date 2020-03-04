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

// reducers.js
export const mainReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_ANSWER':
            return action.responses;
        case 'CORRECT_ANSWER':
            return Object.assign([], state, action.answers)
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