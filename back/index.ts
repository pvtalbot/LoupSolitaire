import Fastify from "fastify";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import cors from "@fastify/cors";
import { PrismaClient } from "./generated/client/index.js";
import userRoutes from "./src/routes/users.ts";

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

fastify.decorate('prisma', prisma)
await fastify.register(userRoutes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
