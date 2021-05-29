import express from "express";
import { json } from "body-parser";

const app = express();
app.use(json());

// api for getting the current user
app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there!");
});

app.listen(3000, () => {
  console.log("Listening on port 3000!!");
});
