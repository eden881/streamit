import React from "react";
import { Row, Form } from "react-bootstrap";
import Player from "../Player";
import TrackCard from "../TrackCard";

class Browse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [], selectedTrack: null };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleTrackSelection = this.handleTrackSelection.bind(this);
    this.onClosePlayer = this.onClosePlayer.bind(this);
  }

  handleSearchChange(event) {
    const search = event.target.value;
    if (!search) {
      this.setState({ searchResults: [] });
      return;
    }
    this.props.spotifyApi.searchTracks(search).then((res) => {
      let results = res.body.tracks.items.map((track) => {
        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumPhotoUri: track.album.images[0].url,
        };
      });
      this.setState({ searchResults: results });
    });
  }

  handleTrackSelection(track) {
    this.setState({ selectedTrack: track });
  }

  onClosePlayer() {
    this.setState({ selectedTrack: null });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.selectedTrack ? (
          <Row>
            <Player
              track={this.state.selectedTrack}
              onClosePlayer={this.onClosePlayer}
            />
          </Row>
        ) : null}
        <Row>
          <h1 className="mt-2 mt-sm-5">Browse</h1>
        </Row>
        <Row>
          <Form>
            <Form.Control
              className="mb-3"
              type="search"
              placeholder="Search Spotify"
              onChange={this.handleSearchChange}
            />
          </Form>
        </Row>
        <Row xs={2} md={3} className="g-4">
          {this.state.searchResults.map((result) => (
            <TrackCard
              key={result.uri}
              track={result}
              onTrackSelection={this.handleTrackSelection}
            />
          ))}
        </Row>
      </React.Fragment>
    );
  }
}

export default Browse;
