import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsListLoadingStatus
} from "../../store/professions";
const Profession = ({ id }) => {
    const isLoading = useSelector(getProfessionsListLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    return <p>{!isLoading ? prof.name : "Loading..."}</p>;
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
