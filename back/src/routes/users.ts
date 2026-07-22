import type { FastifyInstance } from 'fastify';
import type {PrismaClient} from "../../generated/client/index.js";
import { request } from 'node:http';
import { REPL_MODE_SLOPPY } from 'node:repl';

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

        const payload = JSON.stringify({id: user.id})
        const token = Buffer.from(payload).toString("base64");

        return { token, user }

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

    fastify.get('/users/me', async (request, reply) => {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return reply.status(401).send({message: 'Token manquant'});
        }

        try {
            const token = authHeader.split(' ')[1]
            const decodedObject = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
            const id = decodedObject.id;

            if (!id || isNaN(id)) {
                return reply.status(400).send({message: 'Token invalide'})
            }

            const user = await prisma.user.findUnique({
                where: {id}
            });

            return reply.send(user);

        } catch (error) {
            return reply.status(401).send({ message : 'Erreur de décodage du token' });
        }
    })

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

        const payload = JSON.stringify({id: newUser.id})
        const token = Buffer.from(payload).toString("base64");

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
