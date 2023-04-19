import React from "react";
import PropTypes from "prop-types";

const SortDir = ({ direction }) => {
    return (
        <i
            className={
                "bi bi-caret-" + (direction === "asc" ? "down" : "up") + "-fill"
            }
        ></i>
    );
};

SortDir.propTypes = {
    direction: PropTypes.string.isRequired
};

export default SortDir;
