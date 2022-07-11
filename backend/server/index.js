// Imports
const express = require("express");
const request = require("request");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);

// Basic configuration
const port = 5000;
dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirect_uri = process.env.SPOTIFY_CALLBACK_URI;

const app = express();

const generateRandomString = function (length) {
  var randomText = "";
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    randomText += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }

  return randomText;
};

// Set up sessions
app.use(
  session({
    cookie: { maxAge: 3600000 },
    store: new MemoryStore({
      checkPeriod: 3600000,
    }),
    resave: false,
    secret: generateRandomString(32),
  })
);

/**
 * Routes
 */

app.get("/auth/login", (req, res) => {
  const scope = "streaming user-read-email user-read-private";
  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state,
  });

  res.redirect("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString());
});

app.get("/auth/callback", (req, res) => {
  const code = req.query.code;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization: "Basic " + Buffer.from(spotify_client_id + ":" + spotify_client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      req.session.access_token = body.access_token;
      res.redirect("/browse");
    }
  });
});

app.get("/auth/token", (req, res) => {
  res.json({
    access_token: req.session.access_token,
  });
});

/**
 * Fall back to React frontend
 */

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../frontend/build/index.html"));
});

app.listen(process.env.PORT || port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
