const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

//connect to database
connectDB();

// Init Middleware to accept body on requests
app.use(express.json({ extended: false }));

//Define routes
// to register users
app.use("/api/users", require("./routes/users"));
//to authenticate users
app.use("/api/auth", require("./routes/auth"));
//to get all images / single image  / buy images  gallery
app.use("/api/images", require("./routes/images"));

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}...`);
});
