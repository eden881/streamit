import React from "react";
import { Row } from "react-bootstrap";

class NotFound extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <h1 className="mt-2 mt-md-3">Oops! 404.</h1>
        </Row>
        <Row>
          <p>
            Are you lost? There is nothing to see here.
            <br />
            Beep beep, boop boop. &#x1F916;
          </p>
        </Row>
      </React.Fragment>
    );
  }
}

export default NotFound;
