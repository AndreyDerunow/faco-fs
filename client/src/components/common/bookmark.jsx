import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ bookmark, onFavorite, id }) => {
    const addClass = bookmark ? "-fill" : "";
    return (
        <button
            className={"btn-outline-secondary bi bi-bookmark-star" + addClass}
            onClick={() => onFavorite(id)}
        ></button>
    );
};

Bookmark.propTypes = {
    bookmark: PropTypes.bool,
    onFavorite: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default Bookmark;
