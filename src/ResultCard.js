import React from "react";
import { Col, Card } from "react-bootstrap";

class ResultCard extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(_event) {
    this.props.onItemSelection(this.props.details.id);
  }

  render() {
    return (
      <Col>
        <Card style={{ cursor: "pointer" }} onClick={this.selectItem}>
          <Card.Img variant="top" src={`${process.env.REACT_APP_BACKEND_URI}${this.props.details.image}`} />
          <Card.Body>
            <Card.Title>{this.props.details.title}</Card.Title>
            <Card.Text>
              {this.props.details.album} -- {this.props.details.artist}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default ResultCard;
