import React from "react";
import { Container, Alert, Button } from "react-bootstrap";

function Login() {
  return (
    <React.Fragment>
      <Container>
        <Alert key="danger" variant="danger">
          <p>Spotify account is not connected. Please login.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="outline-success" href={`${process.env.REACT_APP_BACKEND_URI}/auth/login`}>
              Login with Spotify
            </Button>
          </div>
        </Alert>
      </Container>
    </React.Fragment>
  );
}

export default Login;
