import React from "react";
import { Col, Card } from "react-bootstrap";

class ResultCard extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
  }

  selectItem(_event) {
    this.props.onItemSelection(this.props.details.uri);
  }

  render() {
    return (
      <Col>
        <Card style={{ cursor: "pointer" }} onClick={this.selectItem}>
          <Card.Img variant="top" src={this.props.details.album?.images[0].url ?? this.props.details.images[0].url} />
          <Card.Body>
            <Card.Title>{this.props.details.name}</Card.Title>
            <Card.Text>
              {this.props.details.artists?.[0].name ?? this.props.details.owner?.display_name ?? ""}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default ResultCard;
