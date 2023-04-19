import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    onChange,
    value,
    options,
    defaultOption,
    error,
    name,
    action
}) => {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.values(options)
            : options;

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name} className="form-label">
                {label}
            </label>

            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
            >
                {!action && (
                    <option disabled value="">
                        {defaultOption}
                    </option>
                )}
                {optionsArray &&
                    optionsArray.map((option) => {
                        return (
                            <option value={option.value} key={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    defaultOption: PropTypes.string,
    error: PropTypes.string,
    name: PropTypes.string,
    action: PropTypes.string
};

export default SelectField;
