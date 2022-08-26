//Action Types
export const LOGGED_IN = `auth/LOGGED_IN`;
export const LOGGED_OUT = `auth/LOGGED_OUT`;

export const initialState = {
    isLoggedIn: false,
    isLoading: true,
    user: null
};

//REDUCER
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN: {
            let { user, usertype, quarry } = action;

            return { ...state, isLoading: false ,isLoggedIn: true, user, usertype };
        }

        case LOGGED_OUT: {
            return { ...state, isLoading: false , isLoggedIn: false, user: null};
        }

        default:
            return state;
    }
};

export default authReducer;