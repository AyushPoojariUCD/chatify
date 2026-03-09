import express from "express";

// EXPRESS APP
const app = express();

// MIDDLEWARES
app.use(express.json());

// PORT
const PORT = process.env.PORT || 3000;

// ROUTES
app.use("api/auth", (req, res) => {
  res.send("Auth route");
});

app.use("api/message", (req, res) => {
  res.send("Message route");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
