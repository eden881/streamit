import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Header appName="StreamIt" />
          <Container style={{ width: "auto", maxWidth: "920px", padding: "0 15px" }}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/browse" element={<Browse appName="StreamIt" />} />
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
