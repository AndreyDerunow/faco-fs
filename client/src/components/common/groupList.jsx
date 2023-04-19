import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    const itemsIsArray = Array.isArray(items);
    const itemsTyped = itemsIsArray ? items : Object.keys(items);
    return (
        <ul className="list-group">
            {itemsTyped.map((item) => {
                return (
                    <li
                        key={
                            itemsIsArray
                                ? item[valueProperty]
                                : items[item][valueProperty]
                        }
                        className={
                            "list-group-item" +
                            ((itemsIsArray ? item : items[item]) ===
                            selectedItem
                                ? " active"
                                : "")
                        }
                        onClick={() =>
                            onItemSelect(itemsIsArray ? item : items[item])
                        }
                        role="button"
                    >
                        {itemsIsArray
                            ? item[contentProperty]
                            : items[item][contentProperty]}
                    </li>
                );
            })}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
