import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/profession.service";

const professionsSlice = createSlice({
    name: "professions",
    initialState: {
        entities: null,
        isLoading: true,
        lastFetch: null,
        errors: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsRecieved: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRequested, professionsRecieved, professionsRequestFailed } =
    actions;
function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}
export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;

    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.get();

            dispatch(professionsRecieved(content));
        } catch (error) {
            dispatch(professionsRequestFailed(error.message));
        }
    }
};

export const getProfessionsList = () => (state) => state.professions.entities;
export const getProfessionsListLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (id) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((el) => el._id === id);
    }
};
export default professionsReducer;
