import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props: { location: Location }) => {
  console.log(props.location);
  return (
    <div>
      <nav>
        <ul>NAV BAR</ul>
        <ul>
          <Link to="/">MAIN PAGE</Link>
        </ul>
        <ul>
          <Link to="/signup">Sign up</Link>
        </ul>
        <ul>
          <Link to="/login">Log in</Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
