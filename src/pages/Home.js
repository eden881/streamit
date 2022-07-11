import React from "react";
import { Row, Image } from "react-bootstrap";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <h1 className="mt-2 mt-md-3">Home</h1>
        </Row>
        <Row>
          <p>Are you ready to stream some music?</p>
          <p>
            You just need to provide your Spotify API key, and then you'll be ready to enjoy all of your favorite tunes!
            &#x1F3B6;
          </p>
        </Row>
        <Image
          alt="Spotify logo"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
          className="mx-auto d-block mt-4"
          width={400}
        />
      </React.Fragment>
    );
  }
}

export default Home;
