const express = require('express');
const app = express();

function errorHandler(err, req, res, next) {
  console.error("ERROR: ", err);

  res.status(500).send("Invalid Server Error");
}

app.get("/admin", (req, res, next) => {
  if (req.query.code !== "1234") {
    next("NotAuthorized");
    return;
  }

  res.send("Hello Admin");
});

app.use(errorHandler);

app.listen(3000);