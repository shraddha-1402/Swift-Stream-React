import React from "react";
import PropTypes from "prop-types";

const FormInput = ({
  label,
  type,
  value,
  changeHandler,
  placeholder,
  property,
  minLength,
}) => {
  return (
    <div className="pos-rel w-100p my-1-5">
      <label htmlFor="standard-input" className="input-label pos-abs">
        {label}
      </label>
      <input
        type={type}
        className="input std-input"
        required
        placeholder={placeholder}
        value={value}
        minLength={minLength}
        onChange={(event) => changeHandler(event, property)}
      />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  minLength: PropTypes.number,
  placeholder: PropTypes.string,
  property: PropTypes.string,
  changeHandler: PropTypes.func,
};

export { FormInput };
