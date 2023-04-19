import React from "react";
import PropTypes from "prop-types";
const UserSearch = ({ onSearch, searchStr }) => {
    return (
        <>
            <input
                type="text"
                className="w-100"
                placeholder="Search..."
                value={searchStr}
                name={searchStr}
                onChange={onSearch}
            />
        </>
    );
};

UserSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchStr: PropTypes.string
};

export default UserSearch;
