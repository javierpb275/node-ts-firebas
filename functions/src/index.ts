import * as functions from "firebase-functions";
import * as express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "./controllers/user.controller";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hey there!"));

app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);
app.patch("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

exports.app = functions.https.onRequest(app);
