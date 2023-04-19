import React from "react";
import PropTypes from "prop-types";
const CheckboxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        onChange({ name, value: !value });
    };

    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };
    return (
        <div className="form-check mb-4">
            <input
                checked={value}
                className={getInputClasses()}
                type="checkbox"
                value=""
                onChange={handleChange}
                id={name}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                {children}
            </label>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

CheckboxField.propTypes = {
    name: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
};
export default CheckboxField;
