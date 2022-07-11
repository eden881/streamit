import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

import ResultCard from "./ResultCard";

function Search(props) {
  const [searchType, setSearchType] = useState("track");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleItemSelection(itemUri) {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${props.deviceId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${props.token}` },
      body: JSON.stringify(itemUri.startsWith("spotify:track") ? { uris: [itemUri] } : { context_uri: itemUri }),
    });
  }

  return (
    <React.Fragment>
      <Form>
        <Row>
          <Col xs={2}>
            <Form.Select defaultValue="track" onChange={(event) => setSearchType(event.target.value)}>
              <option value="track">Tracks</option>
              <option value="album">Albums</option>
              <option value="artist">Artists</option>
              <option value="playlist">Playlists</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="search"
              placeholder={`Search ${searchType}s on Spotify`}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Button
              variant="success"
              onClick={() => {
                fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=${searchType}`, {
                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${props.token}` },
                })
                  .then((res) => res.json())
                  .then((json) => setSearchResults(json[`${searchType}s`].items));
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      <Row xs={2} sm={3} lg={4} className="g-4">
        {searchResults.map((result) => {
          return (
            <ResultCard key={result.uri} details={result} type={searchType} onItemSelection={handleItemSelection} />
          );
        })}
      </Row>
    </React.Fragment>
  );
}

export default Search;
