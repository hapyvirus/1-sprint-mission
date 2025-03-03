import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import productRoute from "./routes/products.js"

dotenv.config();

const app = express();

app.use('/files',express.static('upload'));

app.use(cors());
app.use(express.json());

app.use("/products", productRoute);


app.listen(3000, () => {
  console.log("Server is listening on PORT ");
});
