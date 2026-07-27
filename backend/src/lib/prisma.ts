import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: any; // Use any because $extends changes the type and can cause mismatch with globalThis
};

const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }).$extends({
    query: {
      $allModels: {
        async findMany({ model, operation, args, query }) {
          const modelsWithSoftDelete = ['User', 'Project', 'Service', 'Testimonial', 'TeamMember', 'Post', 'Job'];
          if (modelsWithSoftDelete.includes(model as string)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        },
        async findFirst({ model, operation, args, query }) {
          const modelsWithSoftDelete = ['User', 'Project', 'Service', 'Testimonial', 'TeamMember', 'Post', 'Job'];
          if (modelsWithSoftDelete.includes(model as string)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        },
        async count({ model, operation, args, query }) {
          const modelsWithSoftDelete = ['User', 'Project', 'Service', 'Testimonial', 'TeamMember', 'Post', 'Job'];
          if (modelsWithSoftDelete.includes(model as string)) {
            args.where = { ...args.where, deletedAt: null };
          }
          return query(args);
        }
      }
    }
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
