import React from "react";
import { Button, Container, ProgressBar, Row, Image } from "react-bootstrap";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = { audio: new Audio("./rickroll.mp3") };
    this.closePlayer = this.closePlayer.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.stopTrack = this.stopTrack.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  closePlayer(event) {
    this.stopTrack(event);
    this.props.onClosePlayer();
  }

  playTrack(_event) {
    const audio = this.state.audio;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
    this.setState({ audio: audio });
  }

  stopTrack(_event) {
    const audio = this.state.audio;
    audio.pause();
    audio.currentTime = 0;
    this.setState({ audio: audio });
  }

  render() {
    return (
      <React.Fragment>
        <Container className="mt-2 mt-sm-5 text-center">
          <Row>
            <p className="text-center">
              Now playing: {this.props.track.title}
              <br />
              By: {this.props.track.artist}
            </p>
          </Row>
          <Row>
            <Container>
              <Image
                src={this.props.track.albumPhotoUri}
                width={150}
                height={150}
                className="rounded mx-auto d-block"
              />
            </Container>
          </Row>
          <Row>
            <Container>
              <ProgressBar now={0} className="mb-4 mt-4" />
            </Container>
          </Row>
          <Row>
            <Container>
              <Button
                className="rounded-circle"
                variant="outline-primary"
                onClick={this.stopTrack}
              >
                &#x23F9;
              </Button>{" "}
              <Button
                className="rounded-circle"
                variant="outline-primary"
                onClick={this.playTrack}
              >
                &#x25B6;
              </Button>{" "}
              <Button
                className="rounded-circle"
                variant="outline-primary"
                onClick={this.closePlayer}
              >
                &#x274C;
              </Button>
            </Container>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default Player;
