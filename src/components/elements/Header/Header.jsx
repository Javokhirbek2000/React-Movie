import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="rmdb-header">
      <div className="rmdb-header-content">
        <Link to="/">
          <img
            className="rmdb-logo"
            src="./images/reactMovie_logo.png"
            alt="rmdb-logo"
          />
        </Link>
        <img
          className="rmdb-tmdb-logo"
          src="./images/tmdb_logo.png"
          alt="tmdb logo"
        />
      </div>
    </div>
  );
}
