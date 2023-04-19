import React, { useEffect } from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    if (!isLoading) {
        return (
            <>
                {qualitiesList.map((q) => {
                    return <Qualitie key={q._id} {...q} />;
                })}
            </>
        );
    } else {
        return "Loading...";
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
