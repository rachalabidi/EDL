import React from "react";
import "./buttons.css";
const PrimaryButton = (props) => {
  return (
    <div className="btn primary-btn">
      <a href="/#">{props.children}</a>
    </div>
  );
};
const SecondaryButton = (props) => {
  return (
    <div className="btn secondary-btn">
      <a href="/#">{props.children}</a>
    </div>
  );
};

export default PrimaryButton;
export { SecondaryButton };
