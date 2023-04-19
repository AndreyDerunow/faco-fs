import React, { useState } from "react";
import PropTypes from "prop-types";

import TextArea from "../common/form/textArea";

const CommentForm = ({ id, onSubmit }) => {
    const [comment, setComment] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setComment((prev) => ({ ...prev, [target.name]: target.value }));
    };
    const validateComment = (data) => {
        const commentErrors = {};
        if (data.text.length === 0) {
            commentErrors.text = "Пожалуйста, введите текст комментария";
        } else if (data.text.length < 5) {
            commentErrors.text =
                "Длина комментария должна быть не менее 5 символов";
        }
        setErrors(commentErrors);
        return Object.keys(commentErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            content: comment.text
        };

        const isValid = validateComment(comment);

        if (isValid) {
            onSubmit(data);
            setComment({});
        } else {
            validateComment(comment);
        }
    };

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <h1>New comment</h1>
                    <form onSubmit={handleSubmit}>
                        <TextArea
                            name="text"
                            value={comment.text || ""}
                            onChange={handleChange}
                            error={errors.text}
                        />
                        <button
                            className="btn btn-primary mt-2 float-end"
                            type="submit"
                        >
                            Опубликовать
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

CommentForm.propTypes = {
    id: PropTypes.string,
    onSubmit: PropTypes.func
};

export default CommentForm;
