const express = require("express");
const cors = require("cors");
const auth = require("./routes/authRoutes");
const tasks = require("./routes/taskRoutes");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./dbconfig/dbconfig");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
// app.use(cors({origin: ""}))

//Routes
app.use("/api/auth", auth);
app.use("/api/tasks", tasks);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
