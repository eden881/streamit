import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Container, Image, ProgressBar } from "react-bootstrap";

import ResultCard from "../ResultCard";

function Browse() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongId, setSelectedSongId] = useState(0);
  const [audio, setAudio] = useState(new Audio());
  const [isPaused, setIsPaused] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);

  const selectedSong = searchResults.find((song) => song.id === selectedSongId);

  useEffect(() => {
    isPaused ? audio.pause() : audio.play();
  }, [isPaused]);

  useEffect(() => {
    setIsPaused(true);
    audio.pause();
    if (selectedSong === undefined) setAudio(new Audio());
    else setAudio(new Audio(`${process.env.REACT_APP_BACKEND_URI}${selectedSong.audio}`));
  }, [selectedSong]);

  useEffect(() => {
    if (audio.src) {
      setIsPaused(false);
      setCurrentProgress(0);
      audio.addEventListener("timeupdate", () => setCurrentProgress((audio.currentTime / audio.duration) * 100));
    }
  }, [audio]);

  return (
    <React.Fragment>
      <Row>
        <h1 className="mt-2 mt-md-3">Browse</h1>
      </Row>
      {selectedSong ? (
        <Row>
          <Container className="text-center">
            <Row>
              <Container>
                <Image
                  src={`${process.env.REACT_APP_BACKEND_URI}${selectedSong.image}`}
                  width={200}
                  height={200}
                  className="rounded mx-auto d-block border"
                />
              </Container>
            </Row>
            <Row className="mt-3">
              <p>
                {selectedSong.title}
                <br />
                <strong>By:</strong> {selectedSong.artist}
                <br />
                <strong>From:</strong> {selectedSong.album}
              </p>
            </Row>
            <Row className="mb-4">
              <Container>
                <Button className="rounded-circle" onClick={() => setIsPaused(!isPaused)}>
                  {isPaused ? "\u25B6" : "\u23F8"}
                </Button>{" "}
                <Button className="rounded-circle" onClick={() => setSelectedSongId(0)}>
                  &#x274C;
                </Button>
              </Container>
            </Row>
            <Row className="mb-3">
              <Container style={{ width: "50%" }}>
                <ProgressBar now={currentProgress} />
              </Container>
            </Row>
            <Row className="mb-3">
              <Container style={{ width: "30%" }}>
                <Form.Range />
              </Container>
            </Row>
          </Container>
        </Row>
      ) : null}
      <Row>
        <Form>
          <Row>
            <Col sm={10}>
              <Form.Control type="search" placeholder={"Search tracks on Spotify"} />
            </Col>
            <Col sm={2} className="mt-2 mt-sm-0">
              <Button
                variant="success"
                onClick={() => {
                  fetch(`${process.env.REACT_APP_BACKEND_URI}/api/songs`)
                    .then((res) => res.json())
                    .then((json) =>
                      setSearchResults(
                        json
                          .map((value) => ({ value, sort: Math.random() }))
                          .sort((a, b) => a.sort - b.sort)
                          .map(({ value }) => value)
                      )
                    );
                }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row xs={2} sm={3} lg={4} className="g-4">
          {searchResults.map((result) => {
            return <ResultCard key={result.id} details={result} onItemSelection={setSelectedSongId} />;
          })}
        </Row>
      </Row>
    </React.Fragment>
  );
}

export default Browse;
