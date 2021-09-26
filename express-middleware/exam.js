const express = require('express');
const app = express();

const visited = {};

function countVisited(req, res, next) {
  if (!visited.hasOwnProperty(req.params.username)) {
    visited[req.params.username] = 0;
  }

  visited[req.params.username] += 1;
  req.visited = visited[req.params.username];
  next();
  /**
   * {username} 의 방문횟수를 
   * req.visited 에 저장하는 미들웨어를 완성하세요.
   */
}

/**
 * countVisited 미들웨어를 아래 요청에 연결하세요.
 */
app.get("/users/:username", countVisited, (req, res, next) => {
  res.send(`${req.params.username}:${req.visited}`);
});

app.listen(3000);