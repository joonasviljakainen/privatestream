import React from "react";
import NavBar from "../components/NavBar";

const DefaultLayout = (props: {
  children: JSX.Element | JSX.Element[];
  showNavbar?: boolean;
  showFooter?: boolean;
}) => {
  return (
    <div>
      {props.showNavbar && <NavBar location={window.location} />}

      {props.children}
      {props.showFooter && <div>TODO Footer </div>}
    </div>
  );
};

export default DefaultLayout;
