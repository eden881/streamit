import React from "react";
import { Form, Row, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=97ab2636ba22430a8be725924c694726&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = { localApiKey: this.props.apiKey };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  getFormPrompt() {
    return this.state.localApiKey ? "API key is set" : "Enter API key";
  }

  handleChange(event) {
    this.setState({ localApiKey: event.target.value });
  }

  handleSubmit(event) {
    this.props.onApiKeyChange(this.state.localApiKey);
    event.preventDefault();
  }

  handleDelete(_event) {
    this.props.onApiKeyChange("");
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <h1 className="mt-2 mt-sm-5">Settings</h1>
        </Row>
        <Form onSubmit={this.handleSubmit} className="mb-2">
          <Form.Group className="mb-3" controlId="spotifyApiKey">
            <Form.Label>Spotify API Key</Form.Label>
            <Form.Control
              type="text"
              placeholder={this.getFormPrompt()}
              onChange={this.handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your API key with anyone.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>{" "}
          <OverlayTrigger
            key="top"
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>Use this to auto-grab your API key</Tooltip>}
          >
            <Button variant="success" href={AUTH_URL}>
              Login with Spotify
            </Button>
          </OverlayTrigger>{" "}
          <Button variant="danger" type="button" onClick={this.handleDelete}>
            Delete
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Settings;
