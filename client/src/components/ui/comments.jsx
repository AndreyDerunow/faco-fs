import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "./commentsList";
import CommentForm from "./commentForm";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getCommentsList,
    getCommentsListLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";

const Comments = () => {
    const dispatch = useDispatch();
    const { userId: id } = useParams();
    useEffect(() => {
        dispatch(loadCommentsList(id));
    }, [id]);
    const isLoading = useSelector(getCommentsListLoadingStatus());
    const comments = useSelector(getCommentsList());

    const handleSubmit = (data) => {
        dispatch(createComment({ ...data }, id));
    };
    const handleDelete = (id) => {
        dispatch(removeComment(id));
    };

    return (
        <>
            <CommentForm onSubmit={handleSubmit} id={id} />
            {!isLoading ? (
                <CommentsList onDelete={handleDelete} comments={comments} />
            ) : (
                "Loading..."
            )}
        </>
    );
};

export default Comments;
