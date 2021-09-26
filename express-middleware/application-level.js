const express = require('express');
const app = express();

// 기본적인 미들웨어 작성법
function requestLogger(req, res, next) {
  console.log("TIME: ", new Date());
  next();
}

// 미들웨어에서 특정 값을 다음 미들웨어로 전달하는 방법
function checkIfAdmin(req, res, next) {
  console.log("Check if admin");
  req.isAdmin = req.params.id === 'admin';
  next();
}

// application-level 로 미들웨어를 사용하는 방법
app.use(requestLogger);

app.get("/", (req, res, next) => {
  res.send("hello middleware");
});

// middleware chaining
app.get("/users/:id", checkIfAdmin, (req, res, next) => {
  if (req.isAdmin) {
    res.send("You are admin");
    return;
  }

  res.send("You are not admin");
});

app.listen(3000);