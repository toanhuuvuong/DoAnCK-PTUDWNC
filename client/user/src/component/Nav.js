import React from "react";

import {

  Navbar,
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

function Nav(props) {
  return (
    <>
      <Navbar
        style={{
          border: "2px solid #0080ff",
          background: "#0080ff",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Navbar.Brand>
          <Link to={`/`}>Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to={`/login`}>Logout</Link>
        </Navbar.Collapse>
      </Navbar>
      <div >{props.children}</div>
    </>
  );
}

export default Nav;
