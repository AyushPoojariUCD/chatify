import cors from "cors";
import dotenv from "dotenv";
import express from "express";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
