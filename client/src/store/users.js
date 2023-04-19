import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorageService";
import userService from "../services/user.services";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          auth: { userId: localStorageService.getUserId() },
          errors: null,
          isLogedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          auth: null,
          errors: null,
          isLogedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersRequestFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.errors = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLogedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.errors = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLogedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdated: (state, action) => {
            const updatedUserIndex = state.entities.findIndex(
                (u) => u._id === action.payload._id
            );
            state.entities[updatedUserIndex] = { ...action.payload };
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    userUpdated,
    authRequestFailed,
    usersRequested,
    usersRecieved,
    usersRequestFailed,
    authRequestSuccess,

    userLoggedOut,
    authRequested
} = actions;

const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
export const LogIn =
    ({ email, password, redirect }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.logIn({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };
export const signUp = (payload) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register(payload);
            console.log(data);
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.userId }));
            history.push("/users");
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };
export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.updateUser(payload);
        dispatch(userUpdated(content));
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();

        dispatch(usersRecieved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersListLoadingStatus = () => (state) => state.users.isLoading;
export const getUserById = (id) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((el) => el._id === id);
    }
};
export const getIsLogedIn = () => (state) => state.users.isLogedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.errors;
export default usersReducer;
