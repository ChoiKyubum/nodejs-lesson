const express = require('express');
const app = express();
const router = express.Router();

function requestLogger(req, res, next) {
  console.log("TIME: ", new Date());
  next();
}

function checkIfAdmin(req, res, next) {
  console.log("Check if admin");
  req.isAdmin = req.params.id === 'admin';

  next();
}

router.use((req, res, next) => {
  console.log("Router-Level Middleware");
  next();
});

router.get("/users/:id", checkIfAdmin, (req, res, next) => {
  if (req.isAdmin) {
    res.send("You are admin");
    return;
  }

  res.send("You are not admin");
});

app.use(requestLogger);

app.get("/", (req, res, next) => {
  res.send("hello middleware");
});

app.use("/", router);

app.listen(3000);