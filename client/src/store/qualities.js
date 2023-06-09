import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../services/qualities.service";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesRecieved: (state, action) => {
            state.lastFetch = Date.now();
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesRecieved, qualitiesRequestFailed } =
    actions;
function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return false;
}
export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.fetchAll();
            dispatch(qualitiesRecieved(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};
export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;
// export const getQualitiesByIds = (qualitiesIds) => (state) =>
//     state.qualities.entities.filter((q) => qualitiesIds.includes(q));
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArr = [];
        for (const qId of qualitiesIds) {
            for (const q of state.qualities.entities) {
                if (qId === q._id) {
                    qualitiesArr.push(q);
                    break;
                }
            }
        }
        return qualitiesArr;
    }
    return [];
};
export default qualitiesReducer;
