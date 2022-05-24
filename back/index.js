const compression = require("compression");
const cors = require("cors");
const { indexRouter } = require("./src/router/indexRouter");
const { userRouter } = require("./src/router/userRouter");

const express = require("express");
const app = express();
const port = 3000;

/* express 미들웨어 설정*/

// cors설정
app.use(cors());

// body json 파싱
app.use(express.json());

// HTTP 요청 압축
app.use(compression());

// 라우터 분리
indexRouter(app);
userRouter(app);

app.post("/user", function (req, res) {
  const name = req.body.name;
  return res.send(name);
});

app.listen(port, () => {
  console.log(`Express app listening at port: ${port}`);
});
