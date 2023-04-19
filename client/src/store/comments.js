import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        errors: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.errors = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (e) => e._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsRecieved,
    commentCreated,
    commentRemoved,
    commentsRequestFailed
} = actions;
const commentCreateRequested = createAction("comments/commentCreateRequested");
const commentCreateRequestFailed = createAction(
    "comments/commentCreateRequestFailed"
);
const commentRemoveRequested = createAction("comments/commentRemoveRequested");
const commentRemoveRequestFailed = createAction(
    "comments/commentRemoveRequestFailed"
);

export const createComment =
    (payload, pageId) => async (dispatch, getState) => {
        dispatch(commentCreateRequested());
        const currentUserId = getState().users.auth.userId;
        try {
            const comment = {
                ...payload,
                pageId,
                createdAt: Date.now(),
                userId: currentUserId
            };

            const { content } = await commentService.createComment(comment);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentCreateRequestFailed(error.message));
        }
    };
export const removeComment = (comentId) => async (dispatch) => {
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.removeComment(comentId);
        if (!content) {
            dispatch(commentRemoved(comentId));
        }
    } catch (error) {
        dispatch(commentRemoveRequestFailed(error.message));
    }
};
export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);

        dispatch(commentsRecieved(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const getCommentsList = () => (state) => state.comments.entities;
export const getCommentsListLoadingStatus = () => (state) =>
    state.comments.isLoading;
export default commentsReducer;
