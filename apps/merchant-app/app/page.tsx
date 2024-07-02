import { PrismaClient } from "@repo/db/client";
const client = new PrismaClient();


export default function Home() {
  return (
    <div className="font-bold text-4xl text-red-600">
      Merchant app
    </div>
  );
}
