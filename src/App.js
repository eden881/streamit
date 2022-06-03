// React imports
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpotifyWebApi from "spotify-web-api-node";

// Generic components
import Header from "./Header";
import useAuth from "./useAuth";

// Page components
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Settings from "./pages/Settings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const { REACT_APP_SPOTIFY_CLIENT_ID, REACT_APP_SPOTIFY_CLIENT_SECRET } =
  process.env;
const spotifyCode = new URLSearchParams(window.location.search).get("code");
const spotifyApi = new SpotifyWebApi({
  clientId: REACT_APP_SPOTIFY_CLIENT_ID,
});

function CallBackend(props) {
  const token = useAuth(props.apiKey);

  useEffect(() => {
    if (!token) return;
    spotifyApi.setAccessToken(token);
  }, [token]);

  return null;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleApiKeyChange = this.handleApiKeyChange.bind(this);
    this.state = { apiKey: spotifyCode ? spotifyCode : "" };
  }

  handleApiKeyChange(apiKey) {
    this.setState({ apiKey: apiKey });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.apiKey ? <CallBackend apiKey={this.state.apiKey} /> : null}
        <BrowserRouter>
          <Header appName="&#x1F4FB; StreamIt" apiKey={this.state.apiKey} />
          <Container
            style={{ width: "auto", maxWidth: "680px", padding: "0 15px" }}
          >
            <Routes>
              <Route index element={<Home apiKey={this.state.apiKey} />} />
              <Route
                path="/browse"
                element={<Browse spotifyApi={spotifyApi} />}
              />
              <Route
                path="/settings"
                element={
                  <Settings
                    onApiKeyChange={this.handleApiKeyChange}
                    apiKey={this.state.apiKey}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
