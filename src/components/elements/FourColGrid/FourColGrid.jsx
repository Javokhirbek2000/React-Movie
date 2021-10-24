import React from "react";
import PropTypes from "prop-types";
import "./FourColGrid.css";

function FourColGrid(props) {
  return (
    <div className="rmdb-grid">
      {props.header && !props.loading ? <h1>{props.header}</h1> : null}
      <div className="rmdb-grid-content">
        {props.children.map((el, index) => (
          <div key={index} className="rmdb-grid-element">
            {el}
          </div>
        ))}
      </div>
    </div>
  );
}

FourColGrid.propTypes = {
  header: PropTypes.string,
  loading: PropTypes.bool,
};
export default FourColGrid;
