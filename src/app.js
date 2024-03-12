const express = require("express");
require("./db/conn");
const router = require("./routers/user");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use('/',router);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
});
