import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  log: ['error'],
});

async function main() {
  console.log("Seeding database...");

  const adminEmail = "admin@sofzenix.com";
  const defaultPassword = "AdminPassword123!";
  
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log(`User ${adminEmail} already exists. Skipping seed.`);
    return;
  }

  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  const admin = await prisma.user.create({
    data: {
      email: adminEmail,
      name: "SOFZENIX Admin",
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  console.log(`Successfully created initial SUPER_ADMIN user: ${admin.email}`);
  console.log(`Default Password: ${defaultPassword}`);
  console.log("PLEASE CHANGE THIS PASSWORD IMMEDIATELY AFTER LOGGING IN.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
