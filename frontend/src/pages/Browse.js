import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";

import Search from "../Search";
import WebPlayback from "../player/WebPlayback";
import Login from "../player/Login";

function Browse(props) {
  const [token, setToken] = useState("");
  const [deviceId, setDeviceId] = useState("");

  function newDeviceId(id) {
    setDeviceId(id);
  }

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
  }, []);

  return (
    <React.Fragment>
      <Row>
        <h1 className="mt-2 mt-md-3">Browse</h1>
      </Row>

      {typeof token === "undefined" ? (
        <Row>
          <Login />
        </Row>
      ) : (
        <React.Fragment>
          <Row>
            <WebPlayback token={token} appName={props.appName} onChangedDeviceId={newDeviceId} />
          </Row>
          <Row>
            <Search token={token} deviceId={deviceId} />
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Browse;
