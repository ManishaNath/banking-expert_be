require("dotenv").config();

const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;

connectDB();

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true,
  })
);
app.use(express.json());

const authRoutes = require("./routes/authenticationRoute");
const report = require("./routes/reportRoute");
const user = require("./routes/userRoutes");

app.use("/auth", authRoutes);
app.use("/report", report);
app.use("/user", user);

app.get("/", (req, res) => {
  res.status(200).send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

