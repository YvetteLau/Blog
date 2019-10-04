import * as types from '../action-types';

const setVisibilityFilter = {
    setVisibilityFilter(filter) {
        return {
            type: types.SET_VISIBILITY_FILTER,
            filter
        }
    }
}

export default setVisibilityFilter;