import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProfessionsList } from "../../../store/professions";
import { loadQualitiesList } from "../../../store/qualities";
import {
    getIsLogedIn,
    getUsersListLoadingStatus,
    loadUsersList
} from "../../../store/users";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLogedIn());
    const usersLoadingStatus = useSelector(getUsersListLoadingStatus());
    useEffect(() => {
        dispatch(loadProfessionsList());
        dispatch(loadQualitiesList());
        if (isLoggedIn) {
            dispatch(loadUsersList());
        }
    }, [isLoggedIn]);
    if (usersLoadingStatus) {
        return "Loading...";
    }
    return children;
};

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
