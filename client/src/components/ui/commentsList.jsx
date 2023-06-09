import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Comment from "./comment";

const CommentsList = ({ comments, onDelete }) => {
    const sortedComments = _.orderBy(comments, ["createdAt"], ["desc"]);
    // let comCrop;

    // if (sortedComments.length >= 3) {
    //     comCrop = sortedComments.slice(0, 3);
    // } else {
    //     comCrop = sortedComments;
    // }
    if (comments) {
        return (
            <>
                {!!comments.length && (
                    <div className="card mb-3">
                        <div className="card-body ">
                            <h2>Comments</h2>
                            <hr />
                            {sortedComments.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    comment={comment}
                                    onDelete={onDelete}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </>
        );
    }
};

CommentsList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};
export default CommentsList;
