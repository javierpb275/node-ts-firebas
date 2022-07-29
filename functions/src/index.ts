import * as functions from "firebase-functions";
import * as express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "./controllers/user.controller";
import { validateFirebaseIdToken } from "./middlewares/auth.middleware";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).send("Hey there!"));

app.get("/users", validateFirebaseIdToken, getUsers);
app.get("/users/:id", validateFirebaseIdToken, getUserById);
app.post("/users", validateFirebaseIdToken, createUser);
app.patch("/users/:id", validateFirebaseIdToken, updateUser);
app.delete("/users/:id", validateFirebaseIdToken, deleteUser);

exports.app = functions.https.onRequest(app);
