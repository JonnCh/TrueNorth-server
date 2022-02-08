import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes";

const app = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(routes);

const uri: string = process.env.MongoURI || "";
mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });