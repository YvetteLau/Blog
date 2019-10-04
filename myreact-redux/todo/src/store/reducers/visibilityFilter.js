import * as types from '../action-types';

const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL'
}

export default function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
    switch (action.type) {
        case types.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}