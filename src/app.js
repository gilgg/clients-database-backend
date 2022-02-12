const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const clientRouter = require("./routers/client");

const app = express();
app.use(express.json());
app.use(cors());

app.use(clientRouter);

app.listen(process.env.PORT || 5000);
