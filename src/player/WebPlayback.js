import React, { useState, useEffect } from "react";
import { Container, Row, Button, Image } from "react-bootstrap";

import { getCookie } from "../App";

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

function WebPlayback(props) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const newPlayer = new window.Spotify.Player({
        name: props.appName,
        getOAuthToken: (callback) => {
          callback(getCookie("token"));
        },
        volume: 0.5,
      });

      setPlayer(newPlayer);

      newPlayer.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
        document.cookie = `deviceId=${device_id}; path=/`;
      });

      newPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
        document.cookie = `deviceId=${device_id}; path=/; expires=0`;
      });

      newPlayer.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        newPlayer.getCurrentState().then((newState) => {
          !newState ? setActive(false) : setActive(true);
        });
      });

      newPlayer.connect();
    };
  }, [props.appName]);

  if (!is_active) {
    return <React.Fragment></React.Fragment>;
  } else {
    return (
      <React.Fragment>
        <Container className="text-center">
          <Row>
            <Container>
              <Image
                src={current_track.album.images[0].url}
                width={200}
                height={200}
                className="rounded mx-auto d-block"
              />
            </Container>
          </Row>
          <Row className="mt-3">
            <p>
              {current_track.name}
              <br />
              {current_track.artists[0].name}
            </p>
          </Row>
          <Row className="mb-3">
            <Container>
              <Button
                className="rounded-circle"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                &#x23EE;
              </Button>{" "}
              <Button
                className="rounded-circle"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? "\u25B6" : "\u23F8"}
              </Button>{" "}
              <Button
                className="rounded-circle"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                &#x23ED;
              </Button>
            </Container>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default WebPlayback;
