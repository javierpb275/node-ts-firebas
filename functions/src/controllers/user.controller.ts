import { Response, Request } from "express";
import { db } from "../config/firebase";
import { UserModel } from "../models/user.model";

const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const snapshot = await db.collection("users").get();
  let users: UserModel[] = [];
  snapshot.forEach((doc) => {
    let id = doc.id;
    let data = doc.data();
    users.push({ id, ...data });
  });
  return res.status(200).send(users);
};

const getUserById = async (req: Request, res: Response): Promise<Response> => {
  const snapshot = await db.collection("users").doc(req.params.id).get();
  const userId = snapshot.id;
  const userData = snapshot.data();
  return res.status(200).send({ id: userId, ...userData });
};

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user: UserModel = req.body;
  await db.collection("users").add(user);
  return res.status(201).send({ message: "User created" });
};

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const updatedUser: UserModel = req.body;
  await db.collection("users").doc(req.params.id).update(updatedUser);
  return res.status(200).send({ message: "User updated" });
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  await db.collection("users").doc(req.params.id).delete();
  return res.status(200).send({ message: "User deleted" });
};

export { createUser, updateUser, getUserById, getUsers, deleteUser };
