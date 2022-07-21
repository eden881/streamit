import React, { useEffect } from "react";
import { Row } from "react-bootstrap";

import Search from "../Search";
import WebPlayback from "../player/WebPlayback";
import Login from "../player/Login";
import { getCookie } from "../App";

function Browse(props) {
  useEffect(() => {
    async function getToken() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/auth/token`);
      const json = await response.json();
      document.cookie = `token=${json.access_token}; path=/`;
    }

    if (getCookie("token") === undefined) getToken();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <h1 className="mt-2 mt-md-3">Browse</h1>
      </Row>

      {getCookie("token") === undefined ? (
        <Row>
          <Login />
        </Row>
      ) : (
        <React.Fragment>
          <Row>
            <WebPlayback appName={props.appName} />
          </Row>
          <Row>
            <Search />
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Browse;
