import React, { useState, useEffect } from "react";
import NavHome from "../Nav";
import ListUser from "./listUer";
import "./home.css";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [listUers, setListUsers] = useState([]);
  let token = window.sessionStorage.getItem("token");
  useEffect(() => {
    fetch("http://localhost:5000", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => response.json())
      .then((data) => {
        setIsLoaded(true);
        setListUsers(data);
        return;
      });
  }, []);
  if (!token) {
    return <Redirect push to={{ pathname: "/login" }} />;
  } else {
    if (!isLoaded) {
      return <>Loadding........</>;
    } else {
      return (
        <>
          <NavHome>
            <div className="containerE">
              <div className="divListUser">
                <ListUser listUser={listUers}></ListUser>
              </div>
              <div></div>
            </div>
          </NavHome>
        </>
      );
    }
  }
}
export default Home;
