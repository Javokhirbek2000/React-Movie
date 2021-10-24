import React, { useCallback, useState } from "react";
import FontAwesome from "react-fontawesome";
import "./SearchBar.css";

export default function SearchBar(props) {
  const [value, setValue] = useState("");
  const [timeout, settimeout] = useState(null);
  return (
    <div className="rmdb-searchbar">
      <div className="rmdb-searchbar-content">
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            console.log(value);
            props.callback(value);
          }}
        >
          <FontAwesome
            onClick={() => props.callback(value)}
            className="rmdb-fa-search"
            name="search"
            size="2x"
            style={{ cursor: "pointer" }}
          />
          <input
            type="text"
            className="rmdb-searchbar-input"
            placeholder="Search"
            onChange={(ev) => {
              setValue(ev.target.value);
            }}
            value={value}
          />
        </form>
      </div>
    </div>
  );
}
