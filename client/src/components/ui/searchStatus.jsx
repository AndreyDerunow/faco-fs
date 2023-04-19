import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ number: length }) => {
    const badgeColor = length ? "bg-primary" : "bg-danger";
    let badgeClasses = "badge m-2 ";
    const renderPhrase = (num) => {
        if (num % 100 < 11 && num % 100 < 15) {
            if (num % 10 < 2 || num % 10 > 4) {
                return `${num} человек тусанет с тобой сегодня`;
            } else {
                return `${num} человека тусанут с тобой сегодня`;
            }
        } else {
            return `${num} человек тусанет с тобой сегодня`;
        }
    };
    const badgeText = length
        ? renderPhrase(length)
        : "Никто с тобой не тусанет";

    const renderBadge = () => {
        badgeClasses += badgeColor;
        return <span className={badgeClasses}>{badgeText}</span>;
    };
    return <h1>{renderBadge()}</h1>;
};

SearchStatus.propTypes = {
    number: PropTypes.number.isRequired
};

export default SearchStatus;
