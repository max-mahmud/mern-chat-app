require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// endpoints
app.use("/api/user", require("./routes/userRoutes"));

// port
const PORT = process.env.PORT || 4000;

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // listening for requests
    console.log(`connected to db`);
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(PORT, (req, res) => {
  console.log(`server running on port:${PORT}`);
});
