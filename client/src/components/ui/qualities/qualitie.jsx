import React from "react";
import PropTypes from "prop-types";
const Qualitie = ({ name, color }) => {
    const classes = "badge m-1 bg-" + color;

    return <span className={classes}>{name}</span>;
};

Qualitie.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string
};

export default Qualitie;
