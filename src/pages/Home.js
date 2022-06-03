import React from "react";
import { Row, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

class Home extends React.Component {
  apiAlert() {
    if (this.props.apiKey)
      return <Alert variant="success">Your API key is set up &#x1F389;</Alert>;
    return (
      <Alert variant="danger">
        Please set up your API key in the <Link to={"settings"}>settings</Link>!
      </Alert>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <h1 className="mt-2 mt-sm-5">Welcome, human.</h1>
        </Row>
        <Row>
          <p>Are you ready to stream some music?</p>
          <p>
            You just need to provide your Spotify API key, and then you'll be
            ready to enjoy all of your favorite tunes! &#x1F3B6;
          </p>
        </Row>
        <Row>{this.apiAlert()}</Row>
      </React.Fragment>
    );
  }
}

export default Home;
