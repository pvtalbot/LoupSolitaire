import type { FastifyInstance } from 'fastify';
import type {PrismaClient} from "../../generated/client/index.js";

export default async function userRoutes(fastify: FastifyInstance) {
    const prisma = (fastify as any).prisma as PrismaClient;

    fastify.post("/login", async (request, reply) => {
    try {
        const { username } = request.body as { username: string };

        if (!username) {
        return reply.status(400).send({
            error: "Le nom d'utilisateur est obligatoire."
        });
        }
        const user = await prisma.user.findUnique({
        where: { username }
        })

        if (!user) {
        return reply.status(404).send({
            error: "Utilisateur inconnu"
        })

        }

        const token = Buffer.from(user.username).toString("base64");

        return { token }

    } catch (error) {
        fastify.log.error(error)
        reply.status(500).send({
        error: "Erreur lors de l'identification"
        });
    }
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
        const { username } = request.body as {
        username: string;
        };

        if (!username) {
        return reply.status(400).send({
            error: "Le champ 'name' est obligatoire",
        });
        }

        const newUser = await prisma.user.create({
        data: { username },
        });

        const token = Buffer.from(newUser.username).toString("base64");

        return reply.status(201).send({
        user: newUser,
        token
        });
    } catch (error) {
        fastify.log.error(error);
        reply
        .status(500)
        .send({ error: "Erreur lors de la création de l'utilisateur" });
    }
    });
}
