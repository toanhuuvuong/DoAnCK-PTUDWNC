import React, { useState, useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import "./user.css";
export default function Register() {
  const inputForm = useRef(null);
  const handleSubmit = async () => {
    const form = inputForm.current;
    //window.alert(`${form["firstname"].value} ${form["password"].value}`);

    const username = form["firstname"].value;
    const pass = form["password"].value;
    const d = {
      Name: username,
      Pass: pass,
    };
    const response = await fetch("http:localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d),
    })
      .then((response) => response.json())
      .then((data) => {
        window.sessionStorage.setItem("token", data.token);
        window.location.href = "http://localhost:3000";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (window.sessionStorage.getItem("token")) {
    return <Redirect push to={{ pathname: "/" }} />;
  }
  return (
    <div id="logreg-forms">
      <form ref={inputForm} className="form-signin">
        <h1
          className="h3 mb-3 font-weight-normal"
          style={{ textAlign: "center" }}
        >
          Sign in
        </h1>
        <div className="social-login">
          <button className="btn facebook-btn social-btn" type="button">
            <span>
              <i className="fab fa-facebook-f"></i> Sign in with Facebook
            </span>{" "}
          </button>
          <button className="btn google-btn social-btn" type="button">
            <span>
              <i className="fab fa-google-plus-g"></i> Sign in with Google+
            </span>{" "}
          </button>
        </div>
        <p style={{ textAlign: "center" }}> OR </p>
        <input
          type="text"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
          label={"first name"}
          name={"firstname"}
        />
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required=""
          label={"password"}
          name={"password"}
        />

        <button
          className="btn btn-success btn-block"
          type="submit"
          onClick={handleSubmit}
        >
          <i className="fas fa-sign-in-alt"></i> Sign in
        </button>
        <a href="#" id="forgot_pswd">
          Forgot password?
        </a>
        <hr></hr>
        <div className = "bbb">
        <Link className = "bbb" to={'/register'}>
          <button
            className="btn btn-primary btn-block"
            type="button"
            id="btn-signup "
          >
            <i className="fas fa-user-plus"></i> Sign up New Account
        </button>
        </Link>
        </div>
      </form>
    </div>
  );
}
