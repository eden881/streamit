import React from "react";
import { Col, Card } from "react-bootstrap";

class TrackCard extends React.Component {
  constructor(props) {
    super(props);
    this.selectTrack = this.selectTrack.bind(this);
  }

  selectTrack(_event) {
    this.props.onTrackSelection(this.props.track);
  }

  render() {
    return (
      <Col key={this.props.track.uri}>
        <Card style={{ cursor: "pointer" }} onClick={this.selectTrack}>
          <Card.Img variant="top" src={this.props.track.albumPhotoUri} />
          <Card.Body>
            <Card.Title>{this.props.track.title}</Card.Title>
            <Card.Text>{this.props.track.artist}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default TrackCard;
