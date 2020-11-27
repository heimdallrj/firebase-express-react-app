const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize firebase instance
const configureFirebase = require("./firebase");
configureFirebase();

const apiRoutes = require("./routes/api");

const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port 3001`);
});
