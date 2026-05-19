import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  for (let i = 11; i <= 20; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}@example.com`,
        username: `user${i}`,
        password: hashedPassword,
        avatar: `https://i.pravatar.cc/150?img=${i}`,
        chatIDs: [],
      },
    });

    const post = await prisma.post.create({
      data: {
        title: `Property ${i}`,
        price: 20000 + i * 5000,
        images: [
          "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
        ],
        address: `Street ${i}, Gulshan`,
        city: "Karachi",
        bedroom: (i % 5) + 1,
        bathroom: (i % 3) + 1,
        latitude: "24.8607",
        longitude: "67.0011",
        type: i % 2 === 0 ? "buy" : "rent",
        property: ["apartment", "house", "condo", "land"][i % 4],
        userId: user.id,
      },
    });

    await prisma.postDetail.create({
      data: {
        desc: `This is property number ${i}`,
        utilities: "Some utilities paid by owner",
        pet: i % 2 === 0 ? "Allowed" : "Not Allowed",
        income: "3x rent",
        size: 1000 + i * 100,
        school: 300 + i * 10,
        bus: 100 + i * 5,
        restaurant: 50 + i * 5,
        postId: post.id,
      },
    });
  }

  console.log("10 users + posts inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });