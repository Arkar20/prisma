import express, { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const app = express();

const prisma = new PrismaClient();
app.use(express.json());

app.post("/user", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({ data: { username, password } });

  return res.json(user);
});

app.post("/users/many", async (req: Request, res: Response) => {
  const { usersList } = req.body;
  console.log(usersList);
  const users = await prisma.user.createMany({
    data: usersList,
    // skipDuplicates: true, // Skip 'Bobo'
  });

  return res.json(users);
});

app.get("/user", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { cars: true },
  });
  return res.json(users);
});

app.put("/user", async (req: Request, res: Response) => {
  const { id, username } = req.body;
  const userUpdate = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      username: username,
    },
  });

  return res.json(userUpdate);
});

app.delete("/user/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  return res.json("success delete");
});

//Car REST

app.post("/cars", async (req: Request, res: Response) => {
  const { carList } = req.body;
  const cars = await prisma.car.createMany({
    data: carList,
  });

  return res.json(cars);
});

app.listen(3001, () => console.log("Server is running"));
