import prisma from "@repo/db/client";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import P2pTxn from "../../../components/p2pTxn";


async function getP2pTxn(){
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        include:{
            toUser:true,
            fromUser:true
        }
    });
    return txns.map(t => ({
        from:t.fromUser.name,
        time: t.timestamp,
        amount: t.amount,
        to: t.toUser.name,
    }))
}

export default async function() {
    const transactions = await getP2pTxn();
    return <div className="w-full flex-col">
        <SendCard />
        <div>
            <P2pTxn transactions={transactions}/>
        </div>
    </div>
}