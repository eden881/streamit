import React from "react";
import { Row, Image } from "react-bootstrap";

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <h1 className="mt-2 mt-md-3">About this app</h1>
        </Row>
        <Row>
          <p>
            This application was created with &#x2764; by Eden Yemini for Sapir's web development course, taught by Elad
            Cohen.
          </p>
        </Row>
        <Image alt="Sapir logo" src="/sapir_new_logo.svg" className="mx-auto d-block" width={400} />
      </React.Fragment>
    );
  }
}

export default About;
