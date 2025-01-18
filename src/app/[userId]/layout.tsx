import { fetchNotodos } from "@/db/queries/notodos";
import { fetchRewardClaims } from "@/db/queries/rewardClaims";
import Header from '@/components/header'
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode
  params: {
    userId: string
  }
}


export default async function Layout({ children, params: { userId } }: LayoutProps) {
  const session = await auth();

  if (!session) redirect('/')

  return (
    <>
      <Header
        fetchNotodos={() => fetchNotodos(userId)}
        fetchRewardClaims={() => fetchRewardClaims(userId)}
        userId={userId}
      />
      <div className="relative">
        {children}
      </div>
    </>
  )
}
