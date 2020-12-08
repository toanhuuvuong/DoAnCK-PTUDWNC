import React, { useState, useRef } from "react";
import { Redirect, Link } from "react-router-dom";
import "./user.css";
export default function Register() {
  const inputForm = useRef();
  const [co, setCo] = useState("dumemememe");
  const handleSubmit = async () => {
    const form = inputForm.current;
    //window.alert(`${form["firstname"].value} ${form["password"].value}`);

    const username = form["username"].value;
    const fullName = form["fullName"].value;
    const pass = form["password"].value;
    const rePass = form["rePassword"].value;
    const d = {
      Name: username,
      Pass: pass,
      fullName: fullName,
      rePass: rePass
    };
    const response = await fetch("http://localhost:5000/register", {
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
    <>
      <div id="logreg-forms">
        <form ref={inputForm} className="form-signup">
          <div className="social-login">
            <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f"></i> Sign up with Facebook</span> </button>
          </div>
          <div className="social-login">
            <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign up with Google+</span> </button>
          </div>

          <p style={{ textAlign: "center" }}>OR</p>

          <input type="text" id="user-name" className="form-control" placeholder="Full name" required="" autofocus="" label={"fullName"} name={"fullName"} />
          <input type="email" id="user-email" className="form-control" placeholder="Username" required autofocus="" label={"username"} name={"username"} />
          <input type="password" id="user-pass" className="form-control" placeholder="Password" required autofocus="" label={"password"} name={"password"} />
          <input type="password" id="user-repeatpass" className="form-control" placeholder="Repeat Password" required autofocus="" label={"rePassword"} name={"rePassword"} />

          <button className="btn btn-primary btn-block" type="submit"><i className="fas fa-user-plus" onClick={handleSubmit}></i> Sign Up</button>
          <div className = "bbb"><Link  to={'/login'}><i className="fas fa-angle-left" /> Back</Link></div>
        </form>
      </div></>
  );
}
