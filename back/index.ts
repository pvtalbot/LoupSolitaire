import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import cors from "@fastify/cors";

const fastify = Fastify({
  logger: true,
});
await fastify.register(cors, {
  origin: true,
});

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

fastify.get("/ping", async (request, reply) => {
  return { message: "pong" };
});

fastify.get("/users", async (request, reply) => {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    fastify.log.error(error);
    reply.status(500).send({
      error: "Erreur lors de la récupération des utilisateurs",
    });
  }
});

fastify.post("/users", async (request, reply) => {
  try {
    const { email, username } = request.body as {
      email: string;
      username: string;
    };

    if (!email || !username) {
      return reply.status(400).send({
        error: "Le champ 'name' est obligatoire",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
      },
    });

    return reply.status(201).send(newUser);
  } catch (error) {
    fastify.log.error(error);
    reply
      .status(500)
      .send({ error: "Erreur lors de la création de l'utilisateur" });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
