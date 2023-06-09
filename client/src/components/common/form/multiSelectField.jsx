import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
const MultiSelectField = ({ options, onChange, name, label, defaultValue }) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;
    const handlechange = (value) => {
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <Select
                isMulti
                defaultValue={defaultValue}
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handlechange}
                name={name}
            />
        </div>
    );
};

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
