import "./style.css";
import React from "react";
import PropTypes from "prop-types";
import { categories } from "../../constants";

const CategoryChip = ({ filterCategory, setFilterCategory }) => {
  return (
    <div className="chip-container no-horizontal-scrolbar">
      {categories.map((category, index) => (
        <span key={index}>
          <input
            type="radio"
            name="category"
            id={`category${index}`}
            className="chip-input"
            checked={category === filterCategory.type}
            onChange={() => setFilterCategory({ type: category })}
          />
          <label htmlFor={`category${index}`} className="chip">
            {category}
          </label>
        </span>
      ))}
    </div>
  );
};

CategoryChip.propTypes = {
  filterCategory: PropTypes.object,
  setFilterCategory: PropTypes.func,
};

export { CategoryChip };
