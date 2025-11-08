const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.use("/api/artworks", require("./routes/artworks"));
